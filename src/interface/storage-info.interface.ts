import { Document } from 'mongoose';
export interface StorageInfo extends Document{
    operation: string;
    quantity: number;
    unitCost: number;
    type: string;
    existence: number;
    balance: Balance;
}

interface Balance {
    quantity: number;
    unitCost: number;
    total: number;
}