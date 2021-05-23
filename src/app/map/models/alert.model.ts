import { AlertSeverity, AlertType } from '../enums';
import { IBase } from '../interfaces';

export class Alert implements IBase {
  id!: number;
  buildingId?: number;
  accessPointId?: number;
  severity!: AlertSeverity;
  type!: AlertType;
  message!: string;
  floor?: number;
  createdAt!: Date;
}
