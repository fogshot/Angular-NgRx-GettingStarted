import { Product } from '../../product';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const toggleProductCode = createAction(
  '[Product Page] Toggle Product Code',
);

export const setCurrentProduct = createAction(
  '[Product Page] Set Current Product',
  props<{ currentProductId: number }>(),
);

export const clearCurrentProduct = createAction(
  '[Product Page] Clear Current Product',
);

export const initializeCurrentProduct = createAction(
  '[Product Page] Initialize Current Product',
);

export const createProduct = createAction(
  '[Product Page] Create',
  props<{ product: Product }>(),
);

export const loadProducts = createAction('[Product Page] Read');

export const updateProduct = createAction(
  '[Product Page] Update',
  props<{ product: Product }>(),
);

export const deleteProduct = createAction(
  '[Product Page] Delete',
  props<{ product: Product }>(),
);
