import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductTypeState } from '../reducers/product-type.reducer';

export const selectProductTypeState =
  createFeatureSelector<ProductTypeState>('productType');

export const selectProductTypes = createSelector(
  selectProductTypeState,
  (state) => state.data
);

export const selectProductTypeLoading = createSelector(
  selectProductTypeState,
  (state) => state.loading
);

export const selectProductTypeError = createSelector(
  selectProductTypeState,
  (state) => state.error
);
