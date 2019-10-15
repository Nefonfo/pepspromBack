import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { SheetStorage } from '../../interface/sheet-storage.interface';
import { SheetStorageDto } from '../../dtos/sheet-storage.dto';
import { FindAsDto } from '../../dtos/find-as.dto';
import { StorageInfoService } from '../storage-info/storage-info.service';

@Injectable()
export class SheetsStorageService {

    constructor(
        @InjectModel('SheetStorage') private readonly sheetStorageModel: Model<SheetStorage>,
    ) {}

    async createSheet(sheet: SheetStorageDto): Promise<SheetStorage> {
        const createSheet = new this.sheetStorageModel(sheet);
        return await createSheet.save();
    }

    async findAll(): Promise<SheetStorage[]> {
        return await this.sheetStorageModel.find().exec();
    }

    async findOneAs(data: FindAsDto): Promise<SheetStorage>{
        return await this.sheetStorageModel.findOne({[data.fieldName]: data.data}).exec();
    }
    async findOneAsAndPopulateInfo(data: FindAsDto): Promise<SheetStorage>{
        return await this.sheetStorageModel.findOne({[data.fieldName]: data.data}).populate({
            path: 'info',
            options: { sort: { createdAt: -1 }},
        }).exec();
    }

    async findOneWherePopulateInfo(data: FindAsDto, data2: FindAsDto): Promise<SheetStorage>{
        const result = await this.sheetStorageModel.findOne({[data.fieldName]: data.data}).populate({
            path: 'info',
            match: { [data2.fieldName]: data2.data },
            options: { sort: { createdAt: -1 }},
        }).exec();

        return result;
    }

    async findAs(data: FindAsDto): Promise<SheetStorage[]>{
        return await this.sheetStorageModel.find({[data.fieldName]: data.data}).exec();
    }

    async addStorageInfo(sheetId: Schema.Types.ObjectId, storageId: Schema.Types.ObjectId): Promise<SheetStorage> {
        const sheetStorage = await this.sheetStorageModel.findById(sheetId).exec();
        if (!sheetStorage) {
            return sheetStorage;
        }
        sheetStorage.info.push(storageId);
        return await sheetStorage.save();
    }

}
