import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertType } from 'src/models/_enums/AlertTypeEnum';
import { PaymentMethod } from 'src/models/_enums/PaymentMethodEnum';
import { OrderProductsModel } from 'src/models/orders/OrderProductsModel';
import { OrdersModel } from 'src/models/orders/OrdersModel';
import { ProductsModel } from 'src/models/products/ProductsModel';
import { UsersModel } from 'src/models/user/UsersModel';
import { AlertService } from 'src/services/alert.service';
import { LoadingSpinnerService } from 'src/services/loading-spinner.service';
import { ModalService } from 'src/services/modal.service';
import { OrdersService } from 'src/services/orders.service';
import { ProductsService } from 'src/services/products.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  @Input() orderProduct!: ProductsModel[];
  addOrderForm!: FormGroup;
  paymentMethods = PaymentMethod;

  constructor (
    public modalService: ModalService,
    public productsService: ProductsService,
    public formBuilder: FormBuilder,
    public usersService: UsersService,
    public ordersService: OrdersService,
    public loaderService: LoadingSpinnerService,
    public alertService: AlertService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.addOrderForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      paymentMethod: [null, [Validators.required]],
      orderItems: this.formBuilder.array([])
    });
    this.onPopulateOrderItems();
  }

  onPopulateOrderItems() {
    this.orderProduct.forEach(item => {
      this.orderItems.push(this.onCreateOrderItemFormGroup(item));
    });
  }
  
  onCreateOrderItemFormGroup(orderItem: ProductsModel): FormGroup {
    return this.formBuilder.group({
      ProductId: [orderItem.ProductId],
      ProductImg: [orderItem.ProductImg],
      ProductName: [orderItem.ProductName],
      ProductPrice: [orderItem.ProductPrice],
      AvailablePieces: [orderItem.AvailablePieces],
      Quantity: [null, [Validators.required, Validators.min(1), Validators.max(orderItem.AvailablePieces)]]
    });
  }

  get orderItems(): FormArray {
    return this.addOrderForm.get('orderItems') as FormArray;
  }

  onSubmit() {
    this.alertService.confirm("Are you sure you want to place this order?").then((result) => {
      if(result.value) {
        this.loaderService.start();
        const user: UsersModel = {
          RegisterDate: this.datePipe.transform(this.usersService.onFixUserRegisteredDateFormat(new Date().toString()), 'fullDate')!,
          Address: this.addOrderForm.controls['address'].value,
          Email: this.addOrderForm.controls['email'].value,
          Id: this.usersService.onGenerateUniqueId(),
          Name: this.addOrderForm.controls['name'].value,
          Phone: this.addOrderForm.controls['phone'].value,
        }
    
        const orderItems: OrderProductsModel[] = this.orderItems.controls.map((control: AbstractControl) => {
          const value = control.value;
          return {
              ProductId: value.ProductId,
              Quantity: value.Quantity
          };
        });
    
        const order: OrdersModel = {
          OrderDate: this.datePipe.transform(this.usersService.onFixUserRegisteredDateFormat(new Date().toString()), 'fullDate')!,
          OrderId: this.ordersService.onGenerateUniqueId(),
          PaymentType: this.addOrderForm.controls['paymentMethod'].value,
          Products: orderItems,
          UserId: user.Id
        }
        this.onSaveDataInLocalStorage('users', user);
        this.onSaveDataInLocalStorage('orders', order);
        const products = JSON.parse(localStorage.getItem('products')!) || [];
    
        orderItems.forEach(orderItem => {
            const product = products.find((product: ProductsModel) => product.ProductId === orderItem.ProductId);
            if (product) {
                product.AvailablePieces -= orderItem.Quantity;
                this.productsService.productUpdated.emit(product);
            }
        });
        localStorage.setItem('products', JSON.stringify(products));
        this.loaderService.stop();
        this.modalService.closeModal();
        this.alertService.fire(AlertType.Success);
      }});
  }

  onSaveDataInLocalStorage(localStorageKey: string, data: any) {
    let localStorageKay = JSON.parse(localStorage.getItem(`${localStorageKey}`)!) || [];
    localStorageKay.push(data);
    localStorage.setItem(`${localStorageKey}`, JSON.stringify(localStorageKay));
  }
}
