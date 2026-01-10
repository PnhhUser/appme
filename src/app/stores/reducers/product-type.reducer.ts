import { createReducer, on } from '@ngrx/store';
import { IError } from '../../core/interface/error.interface';
import { IProductType } from '../../pages/product-type/product-type.interface';
import * as ProductTypeAction from '../actions/product-type.action';

export interface ProductTypeState {
  data: IProductType[];
  loading: boolean;
  error: IError | null;
}

export const productTypeState: ProductTypeState = {
  data: [],
  loading: false,
  error: null,
};

export const productTypeReducer = createReducer(
  productTypeState,
  // Load
  on(ProductTypeAction.loadProductType, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductTypeAction.loadSuccessed, (state, { products }) => ({
    ...state,
    loading: false,
    data: products,
  })),

  on(ProductTypeAction.loadFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Product Type
  on(ProductTypeAction.addProductType, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductTypeAction.addProductTypeSuccessed, (state, { productType }) => ({
    ...state,
    loading: false,
    data: [...state.data, productType],
  })),

  on(ProductTypeAction.addProductFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Product Type
  on(ProductTypeAction.updateProductType, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ProductTypeAction.updateProductTypeSuccessed,
    (state, { productType }) => ({
      ...state,
      loading: false,
      data: state.data.map((item) =>
        item.Id === productType.Id ? { ...item, ...productType } : item
      ),
    })
  ),

  on(ProductTypeAction.updateProductFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
