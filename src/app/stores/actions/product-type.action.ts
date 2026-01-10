import { IError } from '../../core/interface/error.interface';
import { createAction, props } from '@ngrx/store';
import { IProductType } from '../../pages/product-type/product-type.interface';

export const loadProductType = createAction('[Product type action] Load');

export const loadSuccessed = createAction(
  '[Product type action] Load successed',
  props<{ products: IProductType[] }>()
);

export const loadFailed = createAction(
  '[Product type action] Load Failed',
  props<{ error: IError }>()
);

// Add Product Actions
export const addProductType = createAction(
  '[Product type action] Add Product Type',
  props<{ productType: Partial<IProductType> }>()
);

export const addProductTypeSuccessed = createAction(
  '[Product type action] Add Product Type Successed',
  props<{ productType: IProductType }>()
);

export const addProductFailed = createAction(
  '[Product type action] Add Product Failed',
  props<{ error: IError }>()
);

// Update Product Actions
export const updateProductType = createAction(
  '[Product type action] Update Product Type',
  props<{ productType: IProductType }>()
);

export const updateProductTypeSuccessed = createAction(
  '[Product type action] Update Product Type Successed',
  props<{ productType: IProductType }>()
);

export const updateProductFailed = createAction(
  '[Product type action] Update Product Failed',
  props<{ error: IError }>()
);
