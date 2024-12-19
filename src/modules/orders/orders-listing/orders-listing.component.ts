import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { GridActionModel } from 'src/models/_common/GridActionModel';
import { GridColDefModel } from 'src/models/_common/GridColDefModel';
import { OrdersModel } from 'src/models/orders/OrdersModel';
import { DataGridService } from 'src/services/data-grid.service';
import { LoadingSpinnerService } from 'src/services/loading-spinner.service';
import { ModalService } from 'src/services/modal.service';
import { OrdersService } from 'src/services/orders.service';

@Component({
  selector: 'app-orders-listing',
  templateUrl: './orders-listing.component.html',
  styleUrls: ['./orders-listing.component.scss']
})
export class OrdersListingComponent {
  orders: OrdersModel[] = [];
  displayedOrders: OrdersModel[] = [];
  gridCols: GridColDefModel[] = [
    {headerName: 'Order Id', field: 'OrderId'},
    {headerName: 'Order Date', field: 'OrderDate'},
    {headerName: 'Payment Type', field: 'PaymentType'}
  ];
  pageSize = 10;
  currentPage = 1;

  constructor(
    private ordersService: OrdersService,
    private loaderService: LoadingSpinnerService,
    private modalService: ModalService,
    private dataGridService: DataGridService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.onGetOrders();
  }

  onActionClicked(gridAction: GridActionModel) {
    switch (gridAction.action) {
      case 'View':
        this.ordersService.onGetOrderDetails(gridAction.data.OrderId);
        break;
      default:
        break;
    }
  }

  onPageChanged(pageNum: number) {
    this.currentPage = pageNum;
    this.onGetOrders();
  }

  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.onGetOrders();
  }

  onGetOrders() {
    this.loaderService.start();
    this.ordersService.onGetAllOrders().pipe(finalize(() => {
      this.loaderService.stop();
    })).subscribe({
      next:(res: OrdersModel[]) => {
        console.log(res);
        if(!localStorage.getItem('orders')){
          this.orders = res;
        } else{
          this.orders = JSON.parse(localStorage.getItem('orders')!);
        }
        this.onUpdateOrdersListing();
        localStorage.setItem('orders', JSON.stringify(this.orders));
        this.onUpdateDisplayedOrders();
      }
    });
  }

  onUpdateDisplayedOrders() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedOrders = this.orders.slice(startIndex, endIndex);
  }

  onUpdateOrdersListing() {
    this.orders = this.orders.map((order) => {
      return {
        OrderDate: this.datePipe.transform(this.dataGridService.onFixDateFormat(order.OrderDate), 'fullDate')!,
        OrderId: order.OrderId,
        PaymentType: order.PaymentType,
        Products: order.Products,
        UserId: order.UserId
      };
    });
  }
}
