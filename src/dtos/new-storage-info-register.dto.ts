import { Schema } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

interface Balance {
  quantity: number;
  unitCost: number;
  total: number;
}
export class NewStorageInfoRegisterDto {
  @IsNotEmpty()
  operation: string;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  unitCost: number;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  existence: number;
  @IsNotEmpty()
  balance: Balance;

  constructor(operation: string,
              quantity: number,
              unitCost: number,
              type: string,
              existence: number,
              balanceQuantity: number,
              balanceUnitCost: number,
              balanceTotal: number,
              ){
    this.operation = operation;
    this.quantity = quantity;
    this.unitCost = unitCost;
    this.type = type;
    this.existence = existence;
    this.balance = {
        quantity: balanceQuantity,
        unitCost: balanceUnitCost,
        total: balanceTotal,
    }
  }
}
