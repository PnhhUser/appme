import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../pages/product/product.service';
import * as ProductAction from '../actions/product.action';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductEffect {
  private action$ = inject(Actions);
  private productService = inject(ProductService);

  load$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProductAction.loadProduct),
      switchMap(() =>
        this.productService.getAll().pipe(
          map((res) => {
            if (!res) {
              throw new Error('Product is null');
            }

            return ProductAction.loadSuccessed({ products: res.data });
          }),
          catchError((error) => {
            return of(ProductAction.loadFailed({ error }));
          })
        )
      )
    );
  });
}
