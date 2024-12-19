import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrdersListingComponent } from './orders-listing/orders-listing.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddOrderComponent } from './add-order/add-order.component';

const routes: Routes = [
    { path: '', component: OrdersListingComponent },
    { path: ':id', component: OrderDetailsComponent }
];

@NgModule({
    declarations: [
        OrdersListingComponent,
        OrderDetailsComponent,
        AddOrderComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        RouterModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class OrdersModule { }
