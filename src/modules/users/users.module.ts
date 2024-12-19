import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { UsersUpsertComponent } from './users-upsert/users-upsert.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    { path: '', component: UsersListingComponent },
];

@NgModule({
    declarations: [
        UsersListingComponent,
        UsersUpsertComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        RouterModule,
        ReactiveFormsModule,
        SharedModule,
        NgbCollapseModule
    ],
    providers: [DatePipe]
})
export class UsersModule { }
