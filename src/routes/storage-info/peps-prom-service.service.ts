import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  ): Promise<StorageInfo | HttpException> {
    let RESPONSEJSON: StorageInfo | HttpException;
    if(newStorage.type === 'ENTRADA'){
          const dataInfoSingle = await this.storageInfoService.findOnebyRefWherePopulate(newStorage.idRefTo, null, null);
          if (typeof dataInfoSingle.info !== 'undefined' && (dataInfoSingle.info).length > 0) {
            const { info } = dataInfoSingle;
            if(info[info.length - 1].balance.existence === 0) {
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
            } else{
              const newdata: NewStorageInfoRegisterDto = new NewStorageInfoRegisterDto(
                newStorage.operation,
                newStorage.quantity,
                newStorage.unitCost,
                newStorage.type,
                newStorage.existence,
                (newStorage.quantity + info[info.length - 1].balance.quantity),
                0,
                (info[info.length - 1].balance.total + (newStorage.unitCost * newStorage.quantity))
              );
              RESPONSEJSON = await this.storageInfoService.createStorageInfo(
                newdata,
                newStorage.idRefTo,
              );
            }
          } else {
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
          }
    } else {
          const dataInfoSingle = await this.storageInfoService.findOnebyRefWherePopulate(newStorage.idRefTo, null, null);
          if (typeof dataInfoSingle.info !== 'undefined' && (dataInfoSingle.info).length > 0) {
            const { info } = dataInfoSingle;
            const copyOfNewStorage = {...newStorage};
            let {existence} = copyOfNewStorage;
            let sumaDeCobro = 0;
            const sumaExistencia = info[info.length - 1].balance.quantity;
            if (sumaExistencia >= newStorage.quantity) {
              for (const data of info) {
                let newDataExistence = 0;
                if (existence !== 0) {
                  if (data.existence >= existence) {
                    newDataExistence = data.existence - existence;
                    sumaDeCobro = sumaDeCobro + (existence * data.unitCost);
                    existence = 0;
                  } else if ((data.existence < existence) && data.existence !== 0) {
                    newDataExistence = 0;
                    sumaDeCobro = sumaDeCobro + (data.existence * data.unitCost);
                    existence = existence - data.existence;
                  }
                } else {
                  break;
                }
                await this.storageInfoService.editStorageInfoExistence(newDataExistence, data.id);
              }
              const newdata: NewStorageInfoRegisterDto = new NewStorageInfoRegisterDto(
                newStorage.operation,
                newStorage.quantity,
                newStorage.unitCost,
                newStorage.type,
                newStorage.existence,
                (sumaExistencia - newStorage.quantity),
                0,
                sumaDeCobro,
              );
              RESPONSEJSON = await this.storageInfoService.createStorageInfo(
                newdata,
                newStorage.idRefTo,
              );
            } else {
              RESPONSEJSON = new HttpException('CANTIDAD NO SOPORTADA CON LA EXISTENCIA', HttpStatus.PRECONDITION_FAILED);
            }
          } else {
            RESPONSEJSON = new HttpException('TIENE QUE HABER ANTES UNA SALIDA', HttpStatus.NOT_ACCEPTABLE);
          }
    }
    return RESPONSEJSON;
  }

  async getResultProm(
    newStorage: NewStorageInfoDto,
    sheetData: SheetStorage,
  ): Promise<StorageInfo | HttpException> {
    let RESPONSEJSON: StorageInfo | HttpException;
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
        RESPONSEJSON = new HttpException('ENTRADA ANTES QUE SALIDA', HttpStatus.NOT_ACCEPTABLE);
      } else {
        const infoAbout = await this.storageInfoService.findOnebyRefWherePopulate(
          newStorage.idRefTo,
          null,
          null,
        );
        const { info } = infoAbout;
        const { balance } = info[0];
        if(newStorage.quantity > balance.quantity) {
          RESPONSEJSON = new HttpException('CANTIDAD NO SOPORTADA CON LA EXISTENCIA', HttpStatus.PRECONDITION_FAILED);
        } else {
          const finalQuantity = balance.quantity - newStorage.quantity;
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
