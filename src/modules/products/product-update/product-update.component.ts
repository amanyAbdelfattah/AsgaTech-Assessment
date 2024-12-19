import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsModel } from 'src/models/products/ProductsModel';
import { ModalService } from 'src/services/modal.service';
import { ProductsModule } from '../products.module';
import { AlertService } from 'src/services/alert.service';
import { AlertType } from 'src/models/_enums/AlertTypeEnum';
import { LoadingSpinnerService } from 'src/services/loading-spinner.service';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  @Input() product!: ProductsModel;
  productForm!: FormGroup;

  constructor(
    public modalService: ModalService,
    public alertService: AlertService,
    public productsService: ProductsService,
    public loaderService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(this.product.ProductName, [Validators.required]),
      price: new FormControl(this.product.ProductPrice, [Validators.required]),
      quantity: new FormControl(this.product.AvailablePieces, [Validators.required, Validators.min(10)]),
    });
  }

  onSubmit() {
    this.alertService.confirm('Are you sure you want to update this product?').then((result) => {
      if(result.value) {
        this.loaderService.start();
        const loadedProducts = JSON.parse(localStorage.getItem('products')!) || [];
  
        const updatedProduct: ProductsModel = {
          ProductId: this.product.ProductId,
          ProductName: this.productForm.controls['name'].value ?? this.product.ProductName,
          ProductPrice: this.productForm.controls['price'].value ?? this.product.ProductPrice,
          AvailablePieces: this.productForm.controls['quantity'].value ?? this.product.AvailablePieces,
          ProductImg: this.product.ProductImg
        };
      
        const productIndex = loadedProducts.findIndex((product: ProductsModel) => product.ProductId === this.product.ProductId);
        if (productIndex !== -1) {
          loadedProducts[productIndex] = updatedProduct;
          localStorage.setItem('products', JSON.stringify(loadedProducts));
          this.productsService.productUpdated.emit(updatedProduct);
          this.modalService.closeModal();
          this.loaderService.stop();
          this.alertService.fire(AlertType.Success);
        }else{
          this.alertService.fire(AlertType.Error);
        }
      }
    });
  }
}
