import { Component, OnInit, ViewChild } from '@angular/core';
import { CellClassParams } from 'ag-grid-community';
import { finalize } from 'rxjs';
import { GridActionModel } from 'src/models/_common/GridActionModel';
import { GridColDefModel } from 'src/models/_common/GridColDefModel';
import { ColPosition } from 'src/models/_enums/ColPositionEnum';
import { ProductsModel } from 'src/models/products/ProductsModel';
import { DataGridComponent } from 'src/modules/shared/data-grid/data-grid.component';
import { DataGridService } from 'src/services/data-grid.service';
import { LoadingSpinnerService } from 'src/services/loading-spinner.service';
import { ModalService } from 'src/services/modal.service';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.scss']
})
export class ProductsListingComponent implements OnInit {
  @ViewChild('grid') grid!: DataGridComponent;
  products: ProductsModel[] = [];
  displayedProducts: ProductsModel[] = [];
  gridCols: GridColDefModel[] = [
    {headerName: 'Product Image', field: 'ProductImg', cellRendererName: 'grid-image', width: 150, position: ColPosition.Start, withSelection: true},
    {headerName: 'Product Name', field: 'ProductName'},
    {headerName: 'Product Price', field: 'ProductPrice'},
    {headerName: 'Available Pieces', field: 'AvailablePieces', cellStyle: this.HighlightTheFewerQuantities},
  ];
  gridCustomButtons = [
    { iconClass: 'fa-cart-plus', title: 'Order Products', action: 'OrderProducts' }
  ];
  pageSize = 10;
  currentPage = 1;

  constructor(
    private productsService: ProductsService,
    private loaderService: LoadingSpinnerService,
    private dataGridService: DataGridService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.productsService.productUpdated.subscribe({
      next: (res: ProductsModel) => {
        const productIndex = this.products.findIndex((product) => product.ProductId == res.ProductId);
        if(productIndex >= 0) {
          this.displayedProducts[productIndex] = res;
          this.onGetProducts();
        } else{
          this.displayedProducts.unshift(res);
          this.dataGridService.dataUpdated.emit(res);
        }
      }
    });
    this.onGetProducts();
  }

  onActionClicked(gridAction: GridActionModel) {
    switch (gridAction.action) {
      case 'Edit':
        this.modalService.openModal('product-update', new Map<string, any>([['product', gridAction.data]]));
        break;
      case 'OrderProducts':
        this.modalService.openModal('order-product', new Map<string, any>([['orderProduct', this.grid.getSelectedRows()]]), 'xl');
        break;
      default:
        break;
    }
  }

  onPageChanged(pageNum: number) {
    this.currentPage = pageNum;
    this.onGetProducts();
  }

  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.onGetProducts();
  }

  HighlightTheFewerQuantities(params: CellClassParams) {
    if(params.data.AvailablePieces < 10) {
      return {
        'background-color': 'var(--bs-warning)',
        'color': 'var(--bs-white)'
      }
    }
    return;
  }

  onGetProducts() {
    this.loaderService.start();
    this.productsService.GetAllProducts().pipe(finalize(() => {
      this.loaderService.stop();
    })).subscribe({
      next:(res: ProductsModel[]) => {
        if(!localStorage.getItem('products')){
          this.products = res;
        } else{
          this.products = JSON.parse(localStorage.getItem('products')!);
        }
        localStorage.setItem('products', JSON.stringify(this.products));
        this.updateDisplayedProducts();
      }
    });
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }
}
