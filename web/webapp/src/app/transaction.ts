import { TransactionType } from './transactionType';

export interface Transaction {
    transactionType: TransactionType;
    details;
    tags: Array<string>;
    date: Date;
    amount: number;
}
