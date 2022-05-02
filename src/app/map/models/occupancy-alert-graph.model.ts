import Helpers from '@core/utils/helpers';

export class OccupancyAlertGraph {
    alertStartTime!: Date;
    alertEndTime!: Date;
    alertSeverity!: string;
    alertType!: string;
    alertMessage!: string;
    time!: Date[];
    occupancy!: number[];
    highOccupancyThreshold!: number[];
    lowOccupancyThreshold!: number[];

    constructor(args: {
        ['v1.0']: {
            occupancy_and_threshold_time_series: {
                alert_start_time: string;
                alert_end_time: string;
                alert_severity: string;
                alert_type: string;
                alert_message: string;
                time: string[];
                occupancy: number[];
                high_occupancy_threshold: number[];
                low_occupancy_threshold: number[];
            };
        };
    }) {
        this.alertStartTime = Helpers.utcDateToEnvironmentDate(args['v1.0'].occupancy_and_threshold_time_series.alert_start_time);
        this.alertEndTime = Helpers.utcDateToEnvironmentDate(args['v1.0'].occupancy_and_threshold_time_series.alert_end_time);
        this.alertSeverity = args['v1.0'].occupancy_and_threshold_time_series.alert_severity;
        this.alertType = args['v1.0'].occupancy_and_threshold_time_series.alert_type;
        this.alertMessage = args['v1.0'].occupancy_and_threshold_time_series.alert_message;
        this.time = args['v1.0'].occupancy_and_threshold_time_series.time.map((t) => Helpers.utcDateToEnvironmentDate(t));
        this.occupancy = args['v1.0'].occupancy_and_threshold_time_series.occupancy.map((t) => +t);
        this.highOccupancyThreshold = args['v1.0'].occupancy_and_threshold_time_series.high_occupancy_threshold.map((t) => +t);
        this.lowOccupancyThreshold = args['v1.0'].occupancy_and_threshold_time_series.low_occupancy_threshold.map((t) => +t);
    }
}
