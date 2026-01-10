import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductTypeService } from '../../pages/product-type/product-type.service';
import * as ProductTypeAction from '../actions/product-type.action';

@Injectable({ providedIn: 'root' })
export class ProductTypeEffect {
  private action$ = inject(Actions);
  private productTypeService = inject(ProductTypeService);

  load$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProductTypeAction.loadProductType),
      switchMap(() =>
        this.productTypeService.getAll().pipe(
          map((res) => {
            if (!res) {
              throw new Error('Product is null');
            }

            return ProductTypeAction.loadSuccessed({ products: res.data });
          }),
          catchError((error) => {
            return of(ProductTypeAction.loadFailed({ error }));
          })
        )
      )
    );
  });
}
