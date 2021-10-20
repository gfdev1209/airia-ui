import { AlertSeverity, AlertType } from '../enums';
import { IBase } from '@shared/interfaces';
import { User } from './user.model';
import { AccessPoint } from './access-point.model';
import { Region } from './region.model';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';

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
  region?: Region;

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
    region: any;
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
    this.createdAt = new Date(
      moment
        .tz(args.createdAt, 'UTC')
        .tz(environment.timeZone)
        .format('YYYY/MM/DD HH:mm:ss')
    );
    this.acknowledgedBy = args.acknowledgedBy;

    if (args.acknowledgedAt) {
      this.acknowledgedAt = new Date(
        moment
          .tz(args.acknowledgedAt, 'UTC')
          .tz(environment.timeZone)
          .format('YYYY/MM/DD HH:mm:ss')
      );
    }
    this.accessPoint = args.accessPoint;
    this.region = new Region(args.region);
    this.alertSeverity = args.alertSeverity as AlertSeverity;
    this.alertType = args.alertType as AlertType;
  }
}
