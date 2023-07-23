import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import {
  createProduct,
  createProductFailure,
  createProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  updateProduct,
  updateProductFailure,
  updateProductSuccess,
} from './product.actions';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) => of(loadProductsFailure({ error }))),
        ),
      ),
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((p) => updateProductSuccess({ product: p })),
          catchError((error) => of(updateProductFailure({ error }))),
        ),
      ),
    );
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createProduct),
      mergeMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((p) => createProductSuccess({ product: p })),
          catchError((err) => of(createProductFailure({ error: err }))),
        ),
      ),
    );
  });
}
