import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddOrderComponent } from 'src/modules/orders/add-order/add-order.component';
import { OrderDetailsComponent } from 'src/modules/orders/order-details/order-details.component';
import { ProductUpdateComponent } from 'src/modules/products/product-update/product-update.component';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  components = new Map<string, any>([
    ['product-update', ProductUpdateComponent],
    ['order-product', AddOrderComponent]

  ]);

  constructor(private ngbModalService: NgbModal) {}

  openModal(
    componentName: string,
    inputs?: Map<string, any>,
    size: string = ''
  ) {
    const modalRef = this.ngbModalService.open(
      this.components.get(componentName),
      { backdrop: 'static', size: size }
    );
    if (inputs) {
      inputs.forEach((value, key) => {
        modalRef.componentInstance[key] = value;
      });
    }
  }

  closeModal() {
    this.ngbModalService.dismissAll();
  }
}
