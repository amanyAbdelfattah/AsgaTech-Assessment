import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { GridActionModel } from 'src/models/_common/GridActionModel';
import { GridColDefModel } from 'src/models/_common/GridColDefModel';
import { GridDataModel } from 'src/models/_common/GridDataModel';
import { GridActions } from './grid-actions.component';
import { DataGridService } from 'src/services/data-grid.service';
import { ModalService } from 'src/services/modal.service';
import { AUTO_STYLE, animate, state, style, transition,  trigger } from '@angular/animations';
import { GridImage } from './grid-image.component';
import { ColPosition } from 'src/models/_enums/ColPositionEnum';
import { GridCustomButtonModel } from 'src/models/_common/GridCustomButtonModel';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(300 + 'ms ease-in-out')),
      transition('true => false', animate(300 + 'ms ease-in-out')),
    ]),
  ],
})
export class DataGridComponent {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  subscriptions: Subscription[] = [];
  @Input() title?: string;
  @Input() titleIconClass?: string;
  @Input() gridCols!: GridColDefModel[];
  @Input() gridData!: GridDataModel;
  @Input() gridCustomButtons?: GridCustomButtonModel[];
  @Input() canView: boolean = false;
  @Input() canEdit: boolean = false;
  @Input() withFiltration: boolean = false;
  @Input() withPagination: boolean = false;
  @Input() withSelection: boolean = false;
  @Input() currentPageSize: number = 10;

  @Output() actionClicked = new EventEmitter<GridActionModel>();
  @Output() activeToggled = new EventEmitter<boolean>();
  @Output() pageChanged = new EventEmitter<number>();
  @Output() pageSizeChanged = new EventEmitter<number>();

  private gridApi!: GridApi<any>;
  private gridColumnApi!: ColumnApi;

  colDefs!: ColDef[];
  filtrationCollapsed = true;
  showActive = true;
  defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  currentPage = 1;
  components = {
      'grid-image': GridImage,
  };
  pageSizes = [10, 25, 50, 100, 250, 500, 1000];
  
  constructor(
    private dataGridService: DataGridService
  ) { }

  ngOnInit() {
    this.onSetUpGrid();
  }

  onSetUpGrid() {
    this.colDefs = this.gridCols
      .filter((x) => !x.cellRendererName)
      .map((gridCol) => {
        return {
          headerName: gridCol.headerName,
          field: gridCol.field,
          flex: 1,
          autoHeight: gridCol.autoHeight,
          width: gridCol.width,
          maxWidth: gridCol.maxWidth,
          sortable: true,
          cellStyle: gridCol.cellStyle,
          headerCheckboxSelection: gridCol.withSelection,
          checkboxSelection: gridCol.withSelection,
        };
      });
    this.gridCols
      .filter((x) => x.cellRendererName)
      .forEach((gridCol) => {
        const col = {
          field: gridCol.headerName,
          filter: false,
          cellRenderer: gridCol.cellRendererName,
          autoHeight: gridCol.autoHeight,
          width: gridCol.width,
          maxWidth: gridCol.maxWidth,
          sortable: true,
          cellStyle: gridCol.cellStyle,
          headerCheckboxSelection: gridCol.withSelection,
          checkboxSelection: gridCol.withSelection,
        };
        gridCol.position === ColPosition.Start
        ? this.colDefs.unshift(col)
        : this.colDefs.push(col);
      });

    if (
      this.canView ||
      this.canEdit
    ) {
      this.colDefs.push({
        field: 'Actions',
        filter: false,
        cellRenderer: GridActions,
        cellRendererParams: {
          clicked: (actionModel: GridActionModel) => {
            this.onActionClicked(actionModel);
          },
          canView: this.canView,
          canEdit: this.canEdit
        },
      });
    }

    const dataGridUpdateSubscription =
      this.dataGridService.dataUpdated.subscribe({
        next: () => {
          this.gridApi.setRowData(this.gridData.data);
        },
      });

    this.subscriptions.push(
      dataGridUpdateSubscription,
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.onAutoSizeAll(false);
  }

  onActionClicked(actionModel: GridActionModel) {
    this.actionClicked.emit(actionModel);
    this.dataGridService.actionClicked.emit(actionModel);
  }

  onToggleActiveClick() {
    this.showActive = !this.showActive;
    this.activeToggled.emit(this.showActive);
  }

  onPageChange(pageNum: number) {
    this.pageChanged.emit(pageNum);
  }

  onPageSizeChange(event: any) {
    this.pageSizeChanged.emit(event.target.value);
  }

  getSelectedRows() {
    return this.gridApi?.getSelectedRows()??[];
  }

  onAutoSizeAll(skipHeader: boolean) {
    const autoFitCols = this.gridCols
      .filter((x) => x.autoWidth === true)
      .map((x) => x.headerName!);
    this.gridColumnApi.autoSizeColumns(autoFitCols, skipHeader);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
