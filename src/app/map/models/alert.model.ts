import { AlertSeverity, AlertType } from '../enums';
import { IBase } from '@shared/interfaces';
import { User } from './user.model';
import { AccessPoint } from './access-point.model';
import { Region } from './region.model';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';
import { OccupancyAlertGraph } from './occupancy-alert-graph.model';

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
    alertSeverityLevel!: number;
    noise!: number;
    score!: number;
    alertType!: AlertType;
    region?: Region;
    buildingId!: number;
    visualizationUrl?: string;
    visualizationJsonUrl?: string;
    alertGraph?: OccupancyAlertGraph;

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
        accessPoint: any;
        region: any;
        alertSeverity: string;
        alertSeverityLevel: number;
        score: number;
        noise: number;
        alertType: string;
        buildingId: number;
        visualizationUrl: string;
        visualizationJsonUrl: string;
    }) {
        this.id = args.alertId;
        this.accessPointId = args.accessPointId;
        this.intensityPercentile = args.intensityPercentile;
        this.regionId = args.regionId;
        this.alertMessage = args.alertMessage;
        this.buildingId = args.buildingId;
        this.createdAt = new Date(moment.tz(args.createdAt, 'UTC').tz(environment.timeZone).format('YYYY/MM/DD HH:mm:ss'));
        this.alertStartTimeUTC = new Date(args.alertStartTime);
        this.alertStartTimeLocal = new Date(moment.tz(args.alertStartTime, 'UTC').tz(moment.tz.guess()).format('YYYY/MM/DD HH:mm:ss'));
        this.alertStartTime = new Date(moment.tz(args.alertStartTime, 'UTC').tz(environment.timeZone).format('YYYY/MM/DD HH:mm:ss'));
        this.alertEndTimeUTC = new Date(args.alertEndTime);
        this.alertEndTimeLocal = new Date(moment.tz(args.alertEndTime, 'UTC').tz(moment.tz.guess()).format('YYYY/MM/DD HH:mm:ss'));
        this.alertEndTime = new Date(moment.tz(args.alertEndTime, 'UTC').tz(environment.timeZone).format('YYYY/MM/DD HH:mm:ss'));
        this.acknowledgedBy = args.acknowledgedBy;

        this.hasPagination = args.hasPagination;
        this.count = args.count;

        if (args.acknowledgedAt) {
            this.acknowledgedAt = new Date(moment.tz(args.acknowledgedAt, 'UTC').tz(environment.timeZone).format('YYYY/MM/DD HH:mm:ss'));
        }
        this.accessPoint = args.accessPoint ? new AccessPoint(args.accessPoint) : undefined;
        this.region = new Region(args.region);
        this.alertSeverity = AlertSeverity[args.alertSeverity] as AlertSeverity;
        this.alertSeverityLevel = args.alertSeverityLevel;
        this.score = args.score;
        this.noise = args.noise;
        this.alertType = args.alertType as AlertType;
        this.visualizationUrl = args.visualizationUrl;
        this.visualizationJsonUrl = args.visualizationJsonUrl;
    }
}
