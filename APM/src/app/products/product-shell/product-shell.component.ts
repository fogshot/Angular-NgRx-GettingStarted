import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import {
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
} from '../state';
import { map } from 'rxjs/operators';
import { VM } from '../product-list/product-list.component';
import { ProductPageActions } from '../state/actions';

@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  vm$: Observable<VM>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<Product>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
    this.errorMessage$ = this.store.select(getError);

    this.vm$ = combineLatest([
      this.products$,
      this.selectedProduct$,
      this.displayCode$,
    ]).pipe(
      map(
        ([products, selectedProduct, displayCode]): VM => ({
          products,
          selectedProduct,
          displayCode,
        }),
      ),
    );
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductPageActions.setCurrentProduct({ currentProductId: product.id }),
    );
  }

  saveProduct(product: Product): void {
    if (product.id === 0) {
      this.store.dispatch(ProductPageActions.createProduct({ product }));
    } else {
      this.store.dispatch(ProductPageActions.updateProduct({ product }));
    }
  }

  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.store.dispatch(ProductPageActions.deleteProduct({ product }));
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(ProductPageActions.clearCurrentProduct());
    }
  }
}
