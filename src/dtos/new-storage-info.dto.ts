import { Schema } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

interface Balance {
  quantity: number;
  unitCost: number;
  total: number;
}
export class NewStorageInfoDto {
  @IsNotEmpty()
  idRefTo: Schema.Types.ObjectId;
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
}
