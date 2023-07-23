import { Product } from '../../product';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const loadProductsSuccess = createAction(
  '[Product API] Load Success',
  props<{ products: Product[] }>(),
);

export const loadProductsFailure = createAction(
  '[Product API] Load Fail',
  props<{ error: string }>(),
);

export const updateProductSuccess = createAction(
  '[Product API] Update Success',
  props<{ product: Product }>(),
);

export const updateProductFailure = createAction(
  '[Product API] Update Failure',
  props<{ error: string }>(),
);

export const createProductSuccess = createAction(
  '[Product API] Create Success',
  props<{ product: Product }>(),
);

export const createProductFailure = createAction(
  '[Product API] Create Fail',
  props<{ error: string }>(),
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete Success',
  props<{ product: Product }>(),
);

export const deleteProductFailure = createAction(
  '[Product API] Delete Fail',
  props<{ error: string }>(),
);
