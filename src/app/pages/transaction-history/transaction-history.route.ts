import { Route } from '@angular/router';
import { TransactionHistoryComponent } from './transaction-history.component';

export const transactionHistoryRoute: Route[] = [
  {
    path: 'transaction-history',
    component: TransactionHistoryComponent,
  },
];
