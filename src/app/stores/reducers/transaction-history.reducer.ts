import { createReducer, on } from '@ngrx/store';
import { IError } from '../../core/interface/error.interface';
import * as TransactionHistoryAction from '../actions/transaction-history.action';

import { ItransactionHistory } from '../../pages/transaction-history/transaction-history.interface';

export interface TransactionHistoryState {
  data: ItransactionHistory[];
  loading: boolean;
  error: IError | null;
}

export const transactionHistoryState: TransactionHistoryState = {
  data: [],
  loading: false,
  error: null,
};

export const transactionHistoryReducer = createReducer(
  transactionHistoryState,
  // Load
  on(TransactionHistoryAction.loadTransactionHistory, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TransactionHistoryAction.loadSuccessed, (state, { products }) => ({
    ...state,
    loading: false,
    data: products,
  })),

  on(TransactionHistoryAction.loadFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
