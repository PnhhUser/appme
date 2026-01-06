import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';

export const selectProductState =
  createFeatureSelector<ProductState>('product');

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.data
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectProductError = createSelector(
  selectProductState,
  (state) => state.error
);
