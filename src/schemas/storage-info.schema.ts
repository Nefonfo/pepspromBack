import { Schema } from 'mongoose';

const types = [
    'ENTRADA',
    'SALIDA',
];
export const StorageInfoSchema: Schema = new Schema({
    operation: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unitCost: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: types,
        required: true,
    },
    balance: {
        quantity: Number,
        unitCost: Number,
        total: Number,
    },
},
{
    timestamps: true,
},
);
