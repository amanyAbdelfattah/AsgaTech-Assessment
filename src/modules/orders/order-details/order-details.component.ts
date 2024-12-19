import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentMethod } from 'src/models/_enums/PaymentMethodEnum';
import { OrdersModel } from 'src/models/orders/OrdersModel';
import { ProductsModel } from 'src/models/products/ProductsModel';
import { UsersModel } from 'src/models/user/UsersModel';
import { ModalService } from 'src/services/modal.service';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId!: number;
  orderDetails!: OrdersModel;
  userDetails!: UsersModel;
  productDetails: ProductsModel[] = [];
  PaymentMethod = PaymentMethod;
  
  constructor(
    public modalService: ModalService,
    public productsService: ProductsService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.orderId);
    this.orderDetails = JSON.parse(localStorage.getItem('orders')!).find((order: OrdersModel) => order.OrderId == this.orderId);
    this.userDetails = JSON.parse(localStorage.getItem('users')!).find((user: UsersModel) => user.Id == this.orderDetails.UserId);
    this.orderDetails.Products.forEach((orderedProducts: any) => {
      const product = JSON.parse(localStorage.getItem('products')!).find((product: ProductsModel) => product.ProductId == orderedProducts.ProductId);
      this.productDetails.push(product);
    });
    console.log(this.productDetails);
  }

  onCalculateOrderTotalAmount(): number {
    let totalAmount = 0;
    this.orderDetails.Products.forEach((orderedProducts: any) => {
      const productPrice = JSON.parse(localStorage.getItem('products')!).find((product: ProductsModel) => product.ProductId == orderedProducts.ProductId).ProductPrice;
      totalAmount += productPrice * orderedProducts.Quantity;
    });
    return totalAmount;
  }


}
