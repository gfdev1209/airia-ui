import { AlertSeverity, AlertType } from '../enums';
import { IBase } from '@shared/interfaces';
import { AccessPoint } from '.';
import { User } from './user.model';

export class Alert implements IBase {
  id!: number;
  accessPointId?: number;
  featureEventtime!: Date;
  featureCreatedAt!: Date;
  intensityPercentile?: number;
  regionId!: number;
  alertMessage!: string;
  createdAt!: Date;
  acknowledgedBy?: User;
  acknowledgedAt?: Date;
  accessPoint?: AccessPoint;
  alertSeverity!: AlertSeverity;
  alertType!: AlertType;
  region?: string;

  constructor(args: {
    alertId: number;
    accessPointId: number;
    featureEventtime: Date;
    featureCreatedAt: Date;
    intensityPercentile: number;
    regionId: number;
    alertMessage: string;
    createdAt: Date;
    acknowledgedBy: User;
    acknowledgedAt: Date;
    accessPoint: AccessPoint;
    region: string;
    alertSeverity: string;
    alertType: string;
  }) {
    this.id = args.alertId;
    this.accessPointId = args.accessPointId;
    this.featureEventtime = args.featureEventtime;
    this.featureCreatedAt = args.featureCreatedAt;
    this.intensityPercentile = args.intensityPercentile;
    this.regionId = args.regionId;
    this.alertMessage = args.alertMessage;
    this.createdAt = args.createdAt;
    this.acknowledgedBy = args.acknowledgedBy;
    this.acknowledgedAt = args.acknowledgedAt;
    this.accessPoint = args.accessPoint;
    this.region = args.region;
    this.alertSeverity = args.alertSeverity as AlertSeverity;
    this.alertType = args.alertType as AlertType;
  }
}
