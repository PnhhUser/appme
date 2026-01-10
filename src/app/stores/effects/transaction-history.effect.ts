import { TransactionHistoryService } from './../../pages/transaction-history/transaction-history.service';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';

import * as TransactionHistoryAction from '../actions/transaction-history.action';

@Injectable({ providedIn: 'root' })
export class TransactionHistoryEffect {
  private action$ = inject(Actions);
  private transactionHistoryService = inject(TransactionHistoryService);

  load$ = createEffect(() => {
    return this.action$.pipe(
      ofType(TransactionHistoryAction.loadTransactionHistory),
      switchMap(() =>
        this.transactionHistoryService.getAll().pipe(
          map((res) => {
            if (!res) {
              throw new Error('TransactionHistory is null');
            }

            return TransactionHistoryAction.loadSuccessed({
              products: res.data,
            });
          }),
          catchError((error) => {
            return of(TransactionHistoryAction.loadFailed({ error }));
          })
        )
      )
    );
  });
}
