import { IBaseInterface } from '../../core/interface/base.interface';

export type TransactionType = 'momo';

export interface ItransactionHistory extends IBaseInterface {
  CustomerId: number;
  ProductId: number;
  TransactionDate: Date;
  QuantitySold: number;
  Amount: number;
  TransactionType: TransactionType;
  Description?: string;
}
