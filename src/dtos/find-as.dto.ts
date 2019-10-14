import { IsString, IsNotEmpty, Validate, IsEnum } from 'class-validator';
import { NumberOrStringOrObjectId } from '../validators/numberOrStringOrObjectId';
import { Types } from 'mongoose';

enum queries {
    'name', 'type', 'operation', 'quantity', 'unitCost', 'balance', '_id'
}

export class FindAsDto {

    @IsString()
    @IsNotEmpty()
    @IsEnum(queries)
    fieldName: string;

    @Validate(NumberOrStringOrObjectId)
    data: any;

    constructor(fieldName: string, data: any) {
        this.fieldName = fieldName;
        this.data = data;
    }

}
