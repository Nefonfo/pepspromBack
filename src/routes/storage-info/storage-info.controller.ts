import {
  Controller,
  Post,
  Body,
  Res,
  forwardRef,
  Inject,
  ValidationPipe,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { NewStorageInfoDto } from '../../dtos/new-storage-info.dto';
import { SheetsStorageService } from '../sheets-storage/sheets-storage.service';
import { FindAsDto } from '../../dtos/find-as.dto';
import { SheetStorage } from '../../interface/sheet-storage.interface';
import { StorageInfoService } from './storage-info.service';
import { NewStorageInfoRegisterDto } from '../../dtos/new-storage-info-register.dto';
import { PepsPromServiceService } from './peps-prom-service.service';
import { StorageInfo } from 'src/interface/storage-info.interface';
enum types {
  'PEPS',
  'COSTO PROMEDIO',
}
@Controller('storage-info')
export class StorageInfoController {
  constructor(
    private readonly storageInfoService: StorageInfoService,
    @Inject(forwardRef(() => SheetsStorageService))
    private readonly externalSheetStorageService: SheetsStorageService,
    private readonly pepsPromService: PepsPromServiceService,
  ) {}

  @Post('newStorageInfo')
  @UsePipes(new ValidationPipe())
  async newStorageInfo(
    @Body() newStorage: NewStorageInfoDto,
    @Res() response: Response,
  ) {
    const findOneDto = new FindAsDto('_id', newStorage.idRefTo);
    const sheetData: SheetStorage = await this.externalSheetStorageService.findOneAsAndPopulateInfo(
      findOneDto,
    );
    if (sheetData == null){
      throw new HttpException('SHEET NOT FOUNDED', HttpStatus.NOT_FOUND);
    }
    let result: StorageInfo | HttpException;
    if (sheetData.type === 'PEPS') {
      result = await this.pepsPromService.getResultPeps(
        newStorage,
      );
    } else {
      result = await this.pepsPromService.getResultProm(
        newStorage,
        sheetData,
      );
    }

    if (result instanceof HttpException) {
      throw result;
    } else {
      return response.status(HttpStatus.OK).json(result);
    }
  }
}
