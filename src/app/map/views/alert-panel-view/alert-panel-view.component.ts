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
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-panel-view',
  templateUrl: './alert-panel-view.component.html',
  styleUrls: ['./alert-panel-view.component.scss'],
})
export class AlertPanelViewComponent implements OnInit, OnChanges {
  @Input() height?: number | null;
  @Input() alerts: Alert[] | null = [];
  @Input() selectedAlert: Alert | null = null;
  @Input() sortType: AlertSortType | null = AlertSortType.Date;
  @Input() showHighUrgency!: boolean;
  @Input() showMediumUrgency!: boolean;
  @Input() showNetworkHealth!: boolean;
  @Input() showAPStatus!: boolean;
  @Input() showCapacity!: boolean;
  // List of alerts for lazy loading
  virtualAlerts: Alert[] = [];
  // Amount of alerts displayed in panel at one time
  alertsDisplayedNum = 9;

  constructor() {}
  ngOnInit(): void {
    this.virtualAlerts = Array.from({ length: this.alertsDisplayedNum });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const currentAlerts: SimpleChange = changes.alerts;
    const sortType: SimpleChange = changes.sortType;
    if (currentAlerts) {
      if (currentAlerts.currentValue) {
        this.loadAlertsLazy({
          first: 0,
          rows: currentAlerts.currentValue.length,
        });
      }
    }
    if (sortType) {
      this.sort(sortType.currentValue);
    }
    if (
      changes.showHighUrgency ||
      changes.showMediumUrgency ||
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
      this.alerts.length > 0 &&
      event.first != null &&
      event.rows != null
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
          this.filterSeverityHigh,
          this.filterSeverityMedium,
          this.filterNetworkHealth,
          this.filterAPStatus,
          this.filterCapacity
        )
      );
    }
    return alerts;
  }
  filterSeverityHigh = (alert: Alert) => {
    return this.showHighUrgency ? true : alert?.severity !== AlertSeverity.High;
  };
  filterSeverityMedium = (alert: Alert) => {
    return this.showMediumUrgency
      ? true
      : alert?.severity !== AlertSeverity.Medium;
  };
  filterCapacity = (alert: Alert) => {
    return this.showCapacity
      ? true
      : alert?.type !== AlertType.Covid_Capacity &&
          alert?.type !== AlertType.High_Capacity &&
          alert?.type !== AlertType.Low_Capacity;
  };
  filterNetworkHealth = (alert: Alert) => {
    return this.showNetworkHealth
      ? true
      : alert?.type !== AlertType.Network_Health;
  };
  filterAPStatus = (alert: Alert) => {
    return this.showAPStatus
      ? true
      : alert?.type !== AlertType.Access_Point_Offline &&
          alert?.type !== AlertType.Access_Point_Online;
  };

  sort(order: number): void {
    if (this.alerts) {
      const alerts = [...this.alerts];
      alerts.sort((data1, data2) => {
        let value1: any;
        let value2: any;
        let result: any;
        if (order === AlertSortType.Date) {
          value1 = data1.createdAt;
          value2 = data2.createdAt;
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        } else if (order === AlertSortType.Type) {
          value1 = data1.type;
          value2 = data2.type;
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        } else if (order === AlertSortType.Urgency) {
          value1 = data1.severity;
          value2 = data2.severity;
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
