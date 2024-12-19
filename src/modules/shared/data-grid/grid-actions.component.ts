import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-actions',
  template:`
    <button *ngIf="params.canView" class="btn btn-primary btn-sm text-white mb-1 me-2" (click)="OnActionClick($event, 'View')" title="View"><i class='fa fa-eye'></i></button>
    <button *ngIf="params.canEdit" class="btn btn-warning btn-sm text-white mb-1 me-2" (click)="OnActionClick($event, 'Edit')" title="Edit"><i class='fa fa-pencil'></i></button>
  `,
})

export class GridActions {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  OnActionClick(e: Event, action: string){
    e.stopPropagation();
    this.params.clicked({action: action, data: this.params.data});
  }
}
