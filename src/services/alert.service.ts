import { Injectable } from '@angular/core';
import { AlertType } from 'src/models/_enums/AlertTypeEnum';
import { AlertModel } from 'src/models/shared/AlertModel';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts = new Map<AlertType, AlertModel>([
    [AlertType.Success, { title: "Success", html: "Your request has been processed successfully", icon: "success" }],
    [AlertType.Error, { title: "Failure", html: "An error has occurred while processing your request", icon: "error" }]
  ]);

  fire(type: AlertType | null = null, title: string | null = null,
    html: string | null = null, icon: SweetAlertIcon | null = null) {
    Swal.fire(type != null ? this.alerts.get(type)?.title : title!,
      type != null ? this.alerts.get(type)?.html : html!,
      type != null ? this.alerts.get(type)?.icon : icon!);
  }

  confirm(html: string | null = null) {
    return Swal.fire({
      title: 'Are you sure?',
      html: html ?? 'Are you sure you want to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    });
  }
}
