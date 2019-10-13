import { Module, forwardRef } from '@nestjs/common';
import { StorageInfoController } from './storage-info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageInfoSchema } from '../../schemas/storage-info.schema';
import { StorageInfoService } from './storage-info.service';
import { SheetsStorageModule } from '../sheets-storage/sheets-storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'StorageInfo',
        schema: StorageInfoSchema,
      },
    ]),
    forwardRef(() => SheetsStorageModule)
  ],
  controllers: [StorageInfoController],
  providers: [
    StorageInfoService,
  ],
})
export class StorageInfoModule {}
