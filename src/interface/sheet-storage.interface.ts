import { Document, Schema, Types } from 'mongoose';
const enum types {
    PEPS = 'PEPS',
    COSTOPROMEDIO = 'COSTO PROMEDIO',
}
export interface SheetStorage extends Document {
    name: string;
    type: types;
    info: Schema.Types.ObjectId[] | any;
}