import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SheetsStorageModule } from './routes/sheets-storage/sheets-storage.module';
import { StorageInfoModule } from './routes/storage-info/storage-info.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pespscont', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    SheetsStorageModule,
    StorageInfoModule,
  ],
})
export class AppModule {}
