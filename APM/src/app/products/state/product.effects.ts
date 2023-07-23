import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductApiActions, ProductPageActions } from './actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) =>
            ProductApiActions.loadProductsSuccess({ products }),
          ),
          catchError((error) =>
            of(ProductApiActions.loadProductsFailure({ error })),
          ),
        ),
      ),
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((p) => ProductApiActions.updateProductSuccess({ product: p })),
          catchError((error) =>
            of(ProductApiActions.updateProductFailure({ error })),
          ),
        ),
      ),
    );
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.createProduct),
      mergeMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((p) => ProductApiActions.createProductSuccess({ product: p })),
          catchError((err) =>
            of(ProductApiActions.createProductFailure({ error: err })),
          ),
        ),
      ),
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.deleteProduct),
      concatMap((action) =>
        this.productService.deleteProduct(action.product.id).pipe(
          map(() =>
            ProductApiActions.deleteProductSuccess({ product: action.product }),
          ),
          catchError((err) =>
            of(ProductApiActions.deleteProductFailure({ error: err })),
          ),
        ),
      ),
    );
  });
}
