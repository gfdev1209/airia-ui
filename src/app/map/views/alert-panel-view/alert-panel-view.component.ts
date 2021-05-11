import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-panel-view',
  templateUrl: './alert-panel-view.component.html',
  styleUrls: ['./alert-panel-view.component.scss'],
})
export class AlertPanelViewComponent {
  @Input() height?: number | null;
  @Input() alerts: Alert[] | null = [];
  // List of alerts for lazy loading
  virtualAlerts: Alert[] = [];

  constructor() {}

  loadAlertsLazy(event: LazyLoadEvent): void {
    // tslint:disable-next-line:no-non-null-assertion
    this.virtualAlerts = Array.from({ length: this.alerts!.length });
    // tslint:disable-next-line:no-non-null-assertion
    const eventFirst = event.first!;
    // tslint:disable-next-line:no-non-null-assertion
    const eventRows = event.rows!;
    // tslint:disable-next-line:no-non-null-assertion
    const fullAlerts = this.alerts!;
    // load data of required page
    const loadedAlerts = fullAlerts.slice(eventFirst, eventFirst + eventRows);
    // Update virtual array
    this.virtualAlerts.splice(
      eventFirst,
      eventFirst + eventRows,
      ...loadedAlerts
    );
    // trigger change detection
    this.virtualAlerts = [...this.virtualAlerts];
  }
}
