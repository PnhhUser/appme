import { TransactionHistoryState } from './../reducers/transaction-history.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectTransactionHistoryState =
  createFeatureSelector<TransactionHistoryState>('transactionHistory');

export const selectTransactionHistory = createSelector(
  selectTransactionHistoryState,
  (state) => state.data
);

export const selectTransactionHistoryLoading = createSelector(
  selectTransactionHistoryState,
  (state) => state.loading
);

export const selectTransactionHistoryError = createSelector(
  selectTransactionHistoryState,
  (state) => state.error
);
