import { Component, OnInit } from '@angular/core';

import { combineLatest, Observable } from 'rxjs';

import { Product } from '../product';
import { Store } from '@ngrx/store';
import {
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
  State,
} from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';
import { loadProducts } from '../state/product.actions';
import { map } from 'rxjs/operators';

interface VM {
  products: Product[];
  selectedProduct: Product;
  displayCode: boolean;
}

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  vm$: Observable<VM>;
  private errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
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
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }
}
