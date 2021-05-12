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
import { AlertSortType } from '../../enums';
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-panel-view',
  templateUrl: './alert-panel-view.component.html',
  styleUrls: ['./alert-panel-view.component.scss'],
})
export class AlertPanelViewComponent implements OnInit, OnChanges {
  @Input() height?: number | null;
  @Input() alerts: Alert[] | null = [];
  @Input() sortType: AlertSortType | null = AlertSortType.Date;
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
      console.log('sort by', sortType.currentValue);
      this.sort(sortType.currentValue);
    }
  }

  loadAlertsLazy(event: LazyLoadEvent): void {
    if (
      this.alerts !== null &&
      this.alerts.length > 0 &&
      event.first != null &&
      event.rows != null
    ) {
      this.virtualAlerts = Array.from({ length: this.alerts.length });
      const loadedAlerts = this.alerts.slice(
        event.first,
        event.first + event.rows
      );
      // Update virtual array
      this.virtualAlerts.splice(
        event.first,
        event.first + event.rows,
        ...loadedAlerts
      );
      // trigger change detection
      this.virtualAlerts = [...this.virtualAlerts];
    }
  }

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
