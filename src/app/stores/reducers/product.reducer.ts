import { createReducer, on } from '@ngrx/store';
import { IError } from '../../core/interface/error.interface';
import { IProduct } from '../../pages/product/product.interface';
import * as ProductAction from '../actions/product.action';

export interface ProductState {
  data: IProduct[];
  loading: boolean;
  error: IError | null;
}

export const productState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  productState,
  // Load
  on(ProductAction.loadProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductAction.loadSuccessed, (state, { products }) => ({
    ...state,
    loading: false,
    data: products,
  })),

  on(ProductAction.loadFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Product
  on(ProductAction.addProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductAction.addProductSuccessed, (state, { product }) => ({
    ...state,
    loading: false,
    data: [...state.data, product],
  })),

  on(ProductAction.addProductFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Product
  on(ProductAction.updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductAction.updateProductSuccessed, (state, { product }) => ({
    ...state,
    loading: false,
    data: state.data.map((item) =>
      item.Id === product.Id ? { ...item, ...product } : item
    ),
  })),

  on(ProductAction.updateProductFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
