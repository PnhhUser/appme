import { IError } from '../../core/interface/error.interface';

import { createAction, props } from '@ngrx/store';
import { ItransactionHistory } from '../../pages/transaction-history/transaction-history.interface';

export const loadTransactionHistory = createAction(
  '[Transaction History action] Load'
);

export const loadSuccessed = createAction(
  '[Transaction History action] Load successed',
  props<{ products: ItransactionHistory[] }>()
);

export const loadFailed = createAction(
  '[Transaction History action] Load Failed',
  props<{ error: IError }>()
);
