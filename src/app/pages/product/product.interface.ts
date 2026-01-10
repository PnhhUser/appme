import { IBaseInterface } from '../../core/interface/base.interface';

export interface IProduct extends IBaseInterface {
  Name: string;
  Quantity: number;
  Category: string;
  Price: number;
}
