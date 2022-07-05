import { AlertSeverity, AlertType } from '../enums';
import { IBase } from '@shared/interfaces';
import { User } from './user.model';
import { AccessPoint } from './access-point.model';
import { Region } from './region.model';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';
import { OccupancyAlertGraph } from './occupancy-alert-graph.model';
import Helpers from '@core/utils/helpers';

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
    isPinned?:boolean;
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
        isPinned?:boolean;
    }) {
        this.id = args.alertId;
        this.accessPointId = args.accessPointId;
        this.intensityPercentile = args.intensityPercentile;
        this.regionId = args.regionId;
        this.alertMessage = args.alertMessage;
        this.buildingId = args.buildingId;
        this.createdAt = Helpers.utcDateToEnvironmentDate(args.createdAt);
        this.alertStartTimeUTC = new Date(args.alertStartTime);
        this.alertStartTimeLocal = Helpers.utcDateToLocalDate(args.alertStartTime);
        this.alertStartTime = Helpers.utcDateToEnvironmentDate(args.alertStartTime);
        this.alertEndTimeUTC = new Date(args.alertEndTime);
        this.alertEndTimeLocal = Helpers.utcDateToLocalDate(args.alertEndTime);
        this.alertEndTime = Helpers.utcDateToEnvironmentDate(args.alertEndTime);
        this.acknowledgedBy = args.acknowledgedBy;

        this.hasPagination = args.hasPagination;
        this.count = args.count;
        this.isPinned = args.isPinned;

        if (args.acknowledgedAt) {
            this.acknowledgedAt = Helpers.utcDateToEnvironmentDate(args.acknowledgedAt);
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
