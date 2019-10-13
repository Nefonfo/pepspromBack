import { Document, Schema } from 'mongoose';
enum types {
    'PEPS',
    'COSTO PROMEDIO',
}
export interface SheetStorage extends Document {
    name: string;
    type: types;
    info: Schema.Types.ObjectId[];
}