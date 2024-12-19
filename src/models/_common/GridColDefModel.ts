import { ColPosition } from "../_enums/ColPositionEnum";

export interface GridColDefModel {
  headerName: string;
  field?: string;
  cellRendererName?: string;
  width?: number;
  maxWidth?: number;
  position?: ColPosition;
  autoWidth?: boolean;
  autoHeight?: boolean;
  sortable?: boolean;
  cellStyle?: any;
  withSelection?: boolean;
}