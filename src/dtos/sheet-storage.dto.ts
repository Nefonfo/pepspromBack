import { Schema } from 'mongoose';
import { IsNotEmpty, IsString, IsEnum, IsMongoId, IsOptional, IsArray } from 'class-validator';

enum types {
    'PEPS',
    'COSTO PROMEDIO',
}
export class SheetStorageDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEnum(types)
    @IsString()
    type: types;

    @IsMongoId({each: true})
    @IsOptional()
    info: Schema.Types.ObjectId;
}
