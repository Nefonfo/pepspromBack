import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SheetsStorageService } from '../sheets-storage/sheets-storage.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { StorageInfo } from '../../interface/storage-info.interface';
import { FindAsDto } from '../../dtos/find-as.dto';
import { SheetStorage } from '../../interface/sheet-storage.interface';
import { NewStorageInfoRegisterDto } from 'src/dtos/new-storage-info-register.dto';

@Injectable()
export class StorageInfoService {

    constructor(
        @InjectModel('StorageInfo')
        private readonly storageInfoModel: Model<StorageInfo>,
        @Inject(forwardRef(() => SheetsStorageService))
        private readonly externalSheetStorageService: SheetsStorageService,
    ) {}

    async findAllbyRef(idSheetRef: Schema.Types.ObjectId): Promise<SheetStorage[]> {
        const data: FindAsDto = new FindAsDto('info', idSheetRef);
        return await this.externalSheetStorageService.findAs(data);
    }

    async findOnebyRefWherePopulate(idSheetRef: Schema.Types.ObjectId, query: string, param: string): Promise<SheetStorage> {
        const data: FindAsDto = new FindAsDto('_id', idSheetRef);
        const data2: FindAsDto = new FindAsDto(query, param);
        
        return await this.externalSheetStorageService.findOneWherePopulateInfo(data, data2);
    }

    async createStorageInfo(newStorageInfo: NewStorageInfoRegisterDto, idSheetRef: Schema.Types.ObjectId): Promise<StorageInfo>{
        const newStorage = new this.storageInfoModel(newStorageInfo);
        const savedStorage = await newStorage.save();
        const ref = await this.externalSheetStorageService.addStorageInfo(idSheetRef, savedStorage.id);
        return savedStorage;
    }

    async editStorageInfoExistence(newExistence: number, id: Schema.Types.ObjectId): Promise<StorageInfo> {
        let info = await this.storageInfoModel.findById(id);
        info.existence = newExistence;
        return await info.save();
    }
}
