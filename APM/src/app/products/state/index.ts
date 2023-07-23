import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app-state';
import { Product } from '../product';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode,
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId,
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentId) => {
    if (currentId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    }
    return getCurrentProductId
      ? state.products.find((product) => product.id === currentId)
      : null;
  },
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products,
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error,
);
