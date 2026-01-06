import { IError } from '../../core/interface/error.interface';
import { IProduct } from './../../pages/product/product.interface';
import { createAction, props } from '@ngrx/store';

export const loadProduct = createAction('[Product action] Load');

export const loadSuccessed = createAction(
  '[Product action] Load successed',
  props<{ products: IProduct[] }>()
);

export const loadFailed = createAction(
  '[Product action] Load Failed',
  props<{ error: IError }>()
);

// Add Product Actions
export const addProduct = createAction(
  '[Product action] Add Product',
  props<{ product: Partial<IProduct> }>()
);

export const addProductSuccessed = createAction(
  '[Product action] Add Product Successed',
  props<{ product: IProduct }>()
);

export const addProductFailed = createAction(
  '[Product action] Add Product Failed',
  props<{ error: IError }>()
);

// Update Product Actions
export const updateProduct = createAction(
  '[Product action] Update Product',
  props<{ product: IProduct }>()
);

export const updateProductSuccessed = createAction(
  '[Product action] Update Product Successed',
  props<{ product: IProduct }>()
);

export const updateProductFailed = createAction(
  '[Product action] Update Product Failed',
  props<{ error: IError }>()
);
