import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'users', loadChildren: () => import('./../modules/users/users.module').then(m => m.UsersModule) },
  { path: 'products', loadChildren: () => import('./../modules/products/products.module').then(m => m.ProductsModule) },
  { path: 'orders', loadChildren: () => import('./../modules/orders/orders.module').then(m => m.OrdersModule) },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
