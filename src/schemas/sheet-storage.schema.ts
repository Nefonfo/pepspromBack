import { Schema } from 'mongoose';

const types = [
    'PEPS',
    'COSTO PROMEDIO',
];
export const SheetStorageSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: types,
        required: true,
    },
    info: [
        {
            type: Schema.Types.ObjectId,
            ref: 'StorageInfo',
        },
    ],
},
{
    timestamps: true,
},
);
