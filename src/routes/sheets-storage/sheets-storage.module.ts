import { Module } from '@nestjs/common';
import { SheetsStorageController } from './sheets-storage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SheetStorageSchema } from '../../schemas/sheet-storage.schema';
import { SheetsStorageService } from './sheets-storage.service';
import { StorageInfoService } from '../storage-info/storage-info.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'SheetStorage',
        schema: SheetStorageSchema,
      },
    ]),
  ],
  controllers: [SheetsStorageController],
  providers: [
    SheetsStorageService,
  ],
  exports: [SheetsStorageService],
})
export class SheetsStorageModule {}
