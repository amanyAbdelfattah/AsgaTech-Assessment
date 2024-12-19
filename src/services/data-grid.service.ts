import { EventEmitter, Injectable } from '@angular/core';
import { GridActionModel } from 'src/models/_common/GridActionModel';

@Injectable({
  providedIn: 'root'
})
export class DataGridService {
  dataUpdated = new EventEmitter<any>();
  actionClicked = new EventEmitter<GridActionModel>();

  onFixDateFormat(DateString: string): string {
    const yearTimePattern = /(\d{4})(\d{2}:\d{2}:\d{2})/;
    if (yearTimePattern.test(DateString)) {
      DateString = DateString.replace(yearTimePattern, '$1 $2');
    }
    return DateString;
  }
}
