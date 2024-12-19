import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/Environment';
import { OrdersModel } from 'src/models/orders/OrdersModel';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  onGetAllOrders(): Observable<OrdersModel[]> {
    return this.httpClient.get<OrdersModel[]>(`${Environment.baseUrl}orders.json`);
  }


  onGenerateUniqueId(): number {
    const lastID = JSON.parse(localStorage.getItem('orders')!)[JSON.parse(localStorage.getItem('orders')!).length - 1].OrderId;
    return lastID + 1;
  }

  onGetOrderDetails(orderId: number) {
    this.router.navigate(['/orders', orderId]);
  }
}
