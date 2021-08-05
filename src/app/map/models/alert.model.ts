import { AlertSeverity, AlertType } from '../enums';
import { IBase } from '@shared/interfaces';

export class Alert implements IBase {
  id!: number;
  buildingId!: number;
  accessPointId!: number;
  severity!: AlertSeverity;
  type!: AlertType;
  message!: string;
  floor?: number; // Need this?
  createdAt!: Date;

  constructor(args: {
    alertId: number;
    buildingId: number;
    accessPointId: number;
    alertSeverity: number;
    alertType: string;
    alertMessage: string;
    createdAt: Date;
  }) {
    this.id = args.alertId;
    this.buildingId = args.buildingId;
    this.accessPointId = args.accessPointId;
    this.severity = args.alertSeverity as AlertSeverity;
    this.type = args.alertType as AlertType;
    this.message = args.alertMessage;
    this.createdAt = args.createdAt;
  }
}
