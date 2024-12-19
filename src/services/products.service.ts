import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Environment } from 'src/environments/Environment';
import { ProductsModel } from 'src/models/products/ProductsModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productUpdated = new EventEmitter<ProductsModel>;
  
  constructor(private httpClient: HttpClient) { }

  GetAllProducts(): Observable<ProductsModel[]> {
    return this.httpClient.get<ProductsModel[]>(`${Environment.baseUrl}products.json`);
  }

  GetProductImage(imageName: string): string {
    return `${imageName}`;
  }
}
