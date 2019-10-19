import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SheetsStorageModule } from './routes/sheets-storage/sheets-storage.module';
import { StorageInfoModule } from './routes/storage-info/storage-info.module';
//
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Nefonfo:Kirisaki5501@pepsprops-5tfr0.mongodb.net/contabilidad?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    SheetsStorageModule,
    StorageInfoModule,
  ],
})
export class AppModule {}
