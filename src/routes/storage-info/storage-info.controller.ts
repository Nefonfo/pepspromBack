import { Controller, Post, Body, Res, forwardRef, Inject, ValidationPipe, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { NewStorageInfoDto } from '../../dtos/new-storage-info.dto';
import { SheetsStorageService } from '../sheets-storage/sheets-storage.service';
import { FindAsDto } from '../../dtos/find-as.dto';
import { SheetStorage } from '../../interface/sheet-storage.interface';
import { StorageInfoService } from './storage-info.service';
import { NewStorageInfoRegisterDto } from '../../dtos/new-storage-info-register.dto';
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
    ) {}

    @Post('newStorageInfo')
    @UsePipes(new ValidationPipe())
    async newStorageInfo(@Body() newStorage: NewStorageInfoDto, @Res() response: Response) {
        const findOneDto = new FindAsDto('_id', newStorage.idRefTo);
        const sheetData: SheetStorage = await this.externalSheetStorageService.findOneAsAndPopulateInfo(findOneDto);
        if (sheetData.type === 'PEPS'){
            if (newStorage.type === 'ENTRADA') {
                // tslint:disable-next-line: prefer-const

                if (sheetData.info[0] == null) {
                    const newdata: NewStorageInfoRegisterDto = new NewStorageInfoRegisterDto(
                        newStorage.operation,
                        newStorage.quantity,
                        newStorage.unitCost,
                        newStorage.type,
                        newStorage.existence,
                        newStorage.quantity,
                        newStorage.unitCost,
                        ((newStorage.quantity) * (newStorage.unitCost)),
                    );
                    this.storageInfoService.createStorageInfo(newdata, newStorage.idRefTo);
                }else{
                    console.log('1');
                    console.log(sheetData);
                }
            } else {
                if(sheetData.info[0] == null) {
                    throw new HttpException('SALIDA ANTES DE HABER ALGUNA ENTRADA', HttpStatus.NOT_ACCEPTABLE);
                }else{
                    console.log('2');
                    console.log(sheetData);
                }
            }
        } else {
        }
    }
}
