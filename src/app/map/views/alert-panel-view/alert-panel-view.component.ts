import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AlertSeverity, AlertSortType, AlertType } from '../../enums';
import { Alert, Building } from '../../models';

@Component({
  selector: 'app-alert-panel-view',
  templateUrl: './alert-panel-view.component.html',
  styleUrls: ['./alert-panel-view.component.scss'],
})
export class AlertPanelViewComponent implements OnInit, OnChanges {
  @Input() height?: number | null;
  @Input() alerts: Alert[] | null = null;
  @Input() selectedAlert: Alert | null = null;
  @Input() selectedBuilding: Building | null = null;
  @Input() sortType: AlertSortType | null = AlertSortType.Date;
  @Input() showSevereUrgency!: boolean;
  @Input() showHighUrgency!: boolean;
  @Input() showMediumUrgency!: boolean;
  @Input() showLowUrgency!: boolean;
  @Input() showAcknowledged!: boolean;
  @Input() showNetworkHealth!: boolean;
  @Input() showAPStatus!: boolean;
  @Input() showCapacity!: boolean;
  // List of alerts for lazy loading
  virtualAlerts: Alert[] = [];
  // Amount of alerts displayed in panel at one time
  alertsDisplayedNum = 9;

  visible = false;

  constructor() {}
  ngOnInit(): void {
    this.virtualAlerts = Array.from({ length: this.alertsDisplayedNum });
    setTimeout(() => (this.visible = true), 500);
  }
  ngOnChanges(changes: SimpleChanges): void {
    const currentAlerts: SimpleChange = changes.alerts;
    const sortType: SimpleChange = changes.sortType;
    if (currentAlerts && this.selectedBuilding === null) {
      if (currentAlerts.currentValue) {
        this.loadAlertsLazy({
          first: 0,
          rows: currentAlerts.currentValue.length,
        });
        if (currentAlerts.currentValue?.length > 0) {
          this.sort(AlertSortType.Date);
        }
      }
    }
    if (sortType) {
      this.sort(sortType.currentValue);
    }
    if (
      changes.showSevereUrgency ||
      changes.showHighUrgency ||
      changes.showMediumUrgency ||
      changes.showLowUrgency ||
      changes.showAcknowledged ||
      changes.showNetworkHealth ||
      changes.showAPStatus ||
      changes.showCapacity
    ) {
      const filteredAlerts = this.filterAlerts();
      this.virtualAlerts = [...filteredAlerts];
    }
  }

  loadAlertsLazy(event: LazyLoadEvent): void {
    if (
      this.alerts !== null &&
      event.first !== undefined &&
      event.rows !== undefined
    ) {
      const filteredAlerts = this.filterAlerts();
      this.virtualAlerts = Array.from({ length: filteredAlerts.length });
      const loadedAlerts = filteredAlerts.slice(
        event.first,
        event.first + event.rows
      );
      // Update virtual array
      this.virtualAlerts.splice(
        event.first,
        event.first + event.rows,
        ...loadedAlerts
      );
      // apply existing filters and trigger change detection
      this.filterAlerts();
    }
  }
  combineFilters =
    (...filters: any[]) =>
    (item: any) => {
      return filters.map((filter) => filter(item)).every((x) => x === true);
    };
  filterAlerts(): Alert[] {
    let alerts: Alert[] = [];
    if (this.alerts) {
      alerts = this.alerts.filter(
        this.combineFilters(
          this.filterSeveritySevere,
          this.filterSeverityHigh,
          this.filterSeverityMedium,
          this.filterSeverityLow,
          this.filterAcknowledged
          // this.filterNetworkHealth,
          // this.filterAPStatus,
          // this.filterCapacity
        )
      );
    }
    return alerts;
  }
  filterSeveritySevere = (alert: Alert) => {
    return this.showSevereUrgency
      ? true
      : alert?.alertSeverity !== AlertSeverity.Severe;
  };
  filterSeverityHigh = (alert: Alert) => {
    return this.showHighUrgency
      ? true
      : alert?.alertSeverity !== AlertSeverity.High;
  };
  filterSeverityMedium = (alert: Alert) => {
    return this.showMediumUrgency
      ? true
      : alert?.alertSeverity !== AlertSeverity.Medium;
  };
  filterSeverityLow = (alert: Alert) => {
    return this.showLowUrgency
      ? true
      : alert?.alertSeverity !== AlertSeverity.Low;
  };
  filterAcknowledged = (alert: Alert) => {
    return this.showAcknowledged ? true : alert?.acknowledgedAt === undefined;
  };
  // filterCapacity = (alert: Alert) => {
  //   return this.showCapacity
  //     ? true
  //     : alert?.alertType !== AlertType.Covid_Capacity &&
  //         alert?.alertType !== AlertType.High_Capacity &&
  //         alert?.alertType !== AlertType.Low_Capacity;
  // };
  // filterNetworkHealth = (alert: Alert) => {
  //   return this.showNetworkHealth
  //     ? true
  //     : alert?.alertType !== AlertType.Network_Health;
  // };
  // filterAPStatus = (alert: Alert) => {
  //   return this.showAPStatus
  //     ? true
  //     : alert?.alertType !== AlertType.Access_Point_Offline &&
  //         alert?.alertType !== AlertType.Access_Point_Online;
  // };

  sort(order: number): void {
    if (this.alerts && this.alerts.length > 0) {
      const alerts = [...this.alerts];
      alerts.sort((data1, data2) => {
        let value1: any;
        let value2: any;
        let result: any;
        if (order === AlertSortType.Date) {
          value1 = data2.alertEndTime;
          value2 = data1.alertEndTime;
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        } else if (order === AlertSortType.Type) {
          value1 = data1.alertType;
          value2 = data2.alertType;
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        } else if (order === AlertSortType.Severity) {
          value1 = data1.alertSeverity;
          value2 = data2.alertSeverity;
          result = value2 < value1 ? -1 : value2 > value1 ? 1 : 0;
        }

        return order * result;
      });
      this.alerts = alerts;
      this.loadAlertsLazy({
        first: 0,
        rows: this.alerts.length,
      });
    }
  }
}
