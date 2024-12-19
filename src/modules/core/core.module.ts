import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavItemsComponent } from './nav-items/nav-items.component';


@NgModule({
    declarations: [
        NavBarComponent,
        FooterComponent,
        LoadingSpinnerComponent,
        SideBarComponent,
        NavItemsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        NavBarComponent,
        FooterComponent,
        LoadingSpinnerComponent,
        SideBarComponent,
    ]
})
export class CoreModule { }
