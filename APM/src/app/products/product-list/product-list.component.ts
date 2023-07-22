import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  private _sub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<any>,
  ) {}

  ngOnInit(): void {
    this._sub = this.productService.selectedProductChanges$.subscribe(
      (currentProduct) => (this.selectedProduct = currentProduct),
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });

    this._sub.add(
      this.store.select('products').subscribe((products) => {
        if (products) {
          this.displayCode = products.productReducer.showProductCode;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch({ type: '[Product] Toggle Product Code' });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }
}
