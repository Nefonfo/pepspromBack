import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SheetsStorageModule } from './routes/sheets-storage/sheets-storage.module';
import { StorageInfoModule } from './routes/storage-info/storage-info.module';
//mongodb+srv://Nefonfo:Kirisaki5501@pepsprops-5tfr0.mongodb.net/pepscont?retryWrites=true&w=majority
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pepscont', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    SheetsStorageModule,
    StorageInfoModule,
  ],
})
export class AppModule {}
