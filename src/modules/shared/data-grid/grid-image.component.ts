import { Component } from '@angular/core';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-grid-image',
  template:`
      <div class="text-center">
        <img class="text-center rounded-circle mb-2" width="30" height="30" *ngIf="params.data.ProductImg" [src]="productsService.GetProductImage(params.data.ProductImg)">
      </div>
    `,
})

export class GridImage {
  public params: any;

  constructor(public productsService: ProductsService) {}
  agInit(params: any): void {
    this.params = params;
  }
}
