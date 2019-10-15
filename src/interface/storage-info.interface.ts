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
    quantity: number | null;
    unitCost: number | null;
    total: number | null;
}