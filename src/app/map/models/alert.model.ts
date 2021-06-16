import { AlertSeverity, AlertType } from '../enums';
import { IBase } from '@shared/interfaces';

export class Alert implements IBase {
  id!: number;
  accessPointId!: number;
  severity!: AlertSeverity;
  type!: AlertType;
  message!: string;
  floor?: number; // Need this?
  createdAt!: Date;

  constructor(args: {
    alertId: number;
    accessPointId: number;
    alertSeverity: string;
    type: string;
    message: string;
    createdAt: Date;
  }) {
    this.id = args.alertId;
    this.accessPointId = args.accessPointId;
    this.severity = args.alertSeverity as AlertSeverity;
    this.type = args.type as AlertType;
    this.message = args.message;
    this.createdAt = args.createdAt;
  }
}
