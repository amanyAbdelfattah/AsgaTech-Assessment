import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsListingComponent } from './products-listing/products-listing.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
    { path: '', component: ProductsListingComponent },
];

@NgModule({
    declarations: [
        ProductsListingComponent,
        ProductUpdateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        RouterModule,
        ReactiveFormsModule,
        SharedModule,
        NgbCollapseModule
    ]
})
export class ProductsModule { }
