import { Controller, Post, Body, Res, HttpStatus, UsePipes, ValidationPipe, HttpException, Get, Req, Query } from '@nestjs/common';
import { SheetStorageDto } from '../../dtos/sheet-storage.dto';
import { SheetsStorageService } from './sheets-storage.service';
import { Response } from 'express';
import { FindAsDto } from '../../dtos/find-as.dto';
@Controller('sheets-storage')
export class SheetsStorageController {

    constructor(
        private readonly SheetStorageService: SheetsStorageService,
    ) {}

    @Get('all')
    async findAll(@Res() response: Response) {
        const result = await this.SheetStorageService.findAll();
        return response.status(HttpStatus.OK).json(result);
    }

    @Post('new')
    @UsePipes(new ValidationPipe())
    async createSheetStorage(@Body() sheet: SheetStorageDto, @Res() response: Response) {
        const newSheetDto: SheetStorageDto = {...sheet};
        const newUserResponse = await this.SheetStorageService.createSheet(newSheetDto);
        return response.status(HttpStatus.CREATED).json(newUserResponse);
    }

    @Get('findOne')
    @UsePipes(new ValidationPipe())
    async findOneQuery(@Query() query: FindAsDto, @Res() response: Response) {
        const userFind = await this.SheetStorageService.findOneAs(query);
        return response.status(HttpStatus.OK).json(userFind);
    }
}
