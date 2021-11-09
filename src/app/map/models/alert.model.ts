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
  intensityPercentile?: number;
  regionId!: number;
  alertMessage!: string;
  createdAt!: Date;
  alertStartTime!: Date;
  alertStartTimeUTC!: Date;
  alertStartTimeLocal!: Date;
  alertEndTime!: Date;
  alertEndTimeUTC!: Date;
  alertEndTimeLocal!: Date;
  hasPagination!: boolean;
  count?: number;
  acknowledgedBy?: User;
  acknowledgedAt?: Date;
  accessPoint?: AccessPoint;
  alertSeverity!: AlertSeverity;
  alertType!: AlertType;
  region?: Region;

  constructor(args: {
    alertId: number;
    accessPointId: number;
    intensityPercentile: number;
    regionId: number;
    alertMessage: string;
    createdAt: Date;
    alertStartTime: Date;
    alertEndTime: Date;
    hasPagination: boolean;
    count: number;
    acknowledgedBy: User;
    acknowledgedAt: Date;
    accessPoint: AccessPoint;
    region: any;
    alertSeverity: string;
    alertType: string;
  }) {
    this.id = args.alertId;
    this.accessPointId = args.accessPointId;
    this.intensityPercentile = args.intensityPercentile;
    this.regionId = args.regionId;
    this.alertMessage = args.alertMessage;
    this.createdAt = new Date(
      moment
        .tz(args.createdAt, 'UTC')
        .tz(environment.timeZone)
        .format('YYYY/MM/DD HH:mm:ss')
    );
    this.alertStartTimeUTC = new Date(args.alertStartTime);
    this.alertStartTimeLocal = new Date(
      moment
        .tz(args.alertStartTime, 'UTC')
        .tz(moment.tz.guess())
        .format('YYYY/MM/DD HH:mm:ss')
    );
    this.alertStartTime = new Date(
      moment
        .tz(args.alertStartTime, 'UTC')
        .tz(environment.timeZone)
        .format('YYYY/MM/DD HH:mm:ss')
    );
    this.alertEndTimeUTC = new Date(args.alertEndTime);
    this.alertEndTimeLocal = new Date(
      moment
        .tz(args.alertEndTime, 'UTC')
        .tz(moment.tz.guess())
        .format('YYYY/MM/DD HH:mm:ss')
    );
    this.alertEndTime = new Date(
      moment
        .tz(args.alertEndTime, 'UTC')
        .tz(environment.timeZone)
        .format('YYYY/MM/DD HH:mm:ss')
    );
    this.acknowledgedBy = args.acknowledgedBy;

    this.hasPagination = args.hasPagination;
    this.count = args.count;

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
