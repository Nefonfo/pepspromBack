import { Injectable } from '@nestjs/common';
import { NewStorageInfoDto } from '../../dtos/new-storage-info.dto';
import { StorageInfoService } from './storage-info.service';
import { NewStorageInfoRegisterDto } from '../../dtos/new-storage-info-register.dto';
import { SheetStorage } from '../../interface/sheet-storage.interface';
import { StorageInfo } from '../../interface/storage-info.interface';

@Injectable()
export class PepsPromServiceService {
  constructor(private readonly storageInfoService: StorageInfoService) {}

  async getResultPeps(
    newStorage: NewStorageInfoDto,
    sheetData: SheetStorage,
  ): Promise<StorageInfo | null> {
    let RESPONSEJSON: StorageInfo | null;

    if (newStorage.type === 'ENTRADA') {
      // tslint:disable-next-line: prefer-const
      const newdata: NewStorageInfoRegisterDto = new NewStorageInfoRegisterDto(
        newStorage.operation,
        newStorage.quantity,
        newStorage.unitCost,
        newStorage.type,
        newStorage.existence,
        newStorage.quantity,
        newStorage.unitCost,
        newStorage.quantity * newStorage.unitCost,
      );
      RESPONSEJSON = await this.storageInfoService.createStorageInfo(
        newdata,
        newStorage.idRefTo,
      );
    } else {
      if (sheetData.info[0] == null) {
        RESPONSEJSON = null;
      } else {
        const copyNewStorage = { ...newStorage };
        let { existence } = copyNewStorage;
        const data = await this.storageInfoService.findOnebyRefWherePopulate(
          copyNewStorage.idRefTo,
          'type',
          'ENTRADA',
        );
        const { info } = data;
        let totalExistence = 0;
        let totalPrice = 0;
        for (const dataInfo of info) {
          totalExistence = totalExistence + dataInfo.existence;
        }
        if (totalExistence >= existence) {
          for (const dataInfo of info) {
            if (existence > 0 && dataInfo.existence !== 0) {
              if (dataInfo.existence >= existence) {
                existence = (existence - dataInfo.existence) * -1;
                totalPrice =
                  totalPrice +
                  (dataInfo.existence - existence) * dataInfo.unitCost;
                await this.storageInfoService.editStorageInfoExistence(
                  existence,
                  dataInfo._id,
                );
              } else {
                totalPrice =
                  totalPrice + dataInfo.unitCost * dataInfo.existence;
                existence = existence - dataInfo.existence;
                await this.storageInfoService.editStorageInfoExistence(
                  0,
                  dataInfo._id,
                );
              }
            } else {
              break;
            }
          }
          const newData: NewStorageInfoRegisterDto = new NewStorageInfoRegisterDto(
            newStorage.operation,
            newStorage.quantity,
            0,
            newStorage.type,
            newStorage.existence,
            newStorage.existence,
            0,
            totalPrice,
          );

          RESPONSEJSON = await this.storageInfoService.createStorageInfo(
            newData,
            newStorage.idRefTo,
          );
        } else {
          RESPONSEJSON = null;
        }
      }
    }
    return RESPONSEJSON;
  }

  async getResultProm(
    newStorage: NewStorageInfoDto,
    sheetData: SheetStorage,
  ): Promise<StorageInfo | null> {
    let RESPONSEJSON: StorageInfo | null;
    if (newStorage.type === 'ENTRADA') {
      if (sheetData.info[0] == null) {
        const newdata: NewStorageInfoRegisterDto = new NewStorageInfoRegisterDto(
          newStorage.operation,
          newStorage.quantity,
          newStorage.unitCost,
          newStorage.type,
          newStorage.existence,
          newStorage.quantity,
          newStorage.unitCost,
          newStorage.quantity * newStorage.unitCost,
        );
        RESPONSEJSON = await this.storageInfoService.createStorageInfo(
          newdata,
          newStorage.idRefTo,
        );
      } else {
        const infoAbout = await this.storageInfoService.findOnebyRefWherePopulate(
          newStorage.idRefTo,
          null,
          null,
        );
        const { info } = infoAbout;
        const { balance } = info[0];
        const finalQuantity = balance.quantity + newStorage.quantity;
        const prom = (((balance.unitCost * balance.quantity) +
        (newStorage.unitCost * newStorage.quantity)) /
        (balance.quantity +
        newStorage.quantity));
        const newdata: NewStorageInfoRegisterDto = new NewStorageInfoRegisterDto(
          newStorage.operation,
          newStorage.quantity,
          newStorage.unitCost,
          newStorage.type,
          newStorage.existence,
          finalQuantity,
          prom,
          prom * finalQuantity,
        );
        RESPONSEJSON = await this.storageInfoService.createStorageInfo(
          newdata,
          newStorage.idRefTo,
        );
      }
    } else {
      if (sheetData.info[0] == null) {
        RESPONSEJSON = null;
      } else {
        const infoAbout = await this.storageInfoService.findOnebyRefWherePopulate(
          newStorage.idRefTo,
          null,
          null,
        );
        const { info } = infoAbout;
        const { balance } = info[0];
        if(newStorage.quantity > balance.quantity){
          RESPONSEJSON = null;
        } else {
          let finalQuantity = 0;
          if (newStorage.quantity === balance.quantity){
            finalQuantity = 0;
          } else{
            finalQuantity = balance.quantity - newStorage.quantity;
          }
          const newdata: NewStorageInfoRegisterDto = new NewStorageInfoRegisterDto(
            newStorage.operation,
            newStorage.quantity,
            balance.unitCost,
            newStorage.type,
            newStorage.existence,
            finalQuantity,
            balance.unitCost,
            balance.unitCost * finalQuantity,
          );
          RESPONSEJSON = await this.storageInfoService.createStorageInfo(
            newdata,
            newStorage.idRefTo,
          );
        }
        
      }
    }
    return RESPONSEJSON;
  }
}
