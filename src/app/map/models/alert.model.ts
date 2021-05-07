import { AlertSeverity, AlertType } from '../enums';
import { IBase } from '../interfaces';

export class Alert implements IBase {
  id!: number;
  createdAt!: Date;
  buildingId?: number;
  accessPointId?: number;
  alertSeverity!: AlertSeverity;
  alertType!: AlertType;
  message!: string;
  floor?: number;
}
