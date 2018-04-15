import { TransactionType } from './transactionType';

export interface Transaction {
    transactionType: TransactionType;
    details;
    tag: string;
    date: Date;
    amount: number;
}
