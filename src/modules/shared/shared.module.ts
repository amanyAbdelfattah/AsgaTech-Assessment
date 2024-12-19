import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataGridComponent } from './data-grid/data-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { GridActions } from './data-grid/grid-actions.component';
import { NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { GridImage } from './data-grid/grid-image.component';

@NgModule({
    declarations: [
        DataGridComponent,
        GridActions,
        GridImage,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgbPagination,
        NgbModule,
        AgGridModule,
    ],
    exports: [
        DataGridComponent,
        GridImage,
    ],
    providers: [DatePipe]
})
export class SharedModule { }
