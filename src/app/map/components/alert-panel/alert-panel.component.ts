import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { MapService } from '@map/services/map.service';
import * as AlertSelectors from '@store/alert/alert.selectors';
import * as AlertActions from '@store/alert/alert.actions';
import { AlertSeverity } from '@map/enums';

@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.scss'],
})
export class AlertPanelComponent implements OnInit {
  overviewPanelHeight$ = this.mapService.overviewPanelHeight$;
  alerts$ = this.store.select(AlertSelectors.selectAll);
  selectedAlert$ = this.store.select(AlertSelectors.selectSelectedAlert);
  alertSortType$ = this.store.select(AlertSelectors.selectSortType);

  showSevereUrgency = true;
  showHighUrgency = true;
  showMediumUrgency = true;
  showLowUrgency = true;
  showAcknowledged = true;
  showNetworkHealth = true;
  showAPStatus = true;
  showCapacity = true;

  constructor(
    private store: Store<RootState>,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AlertActions.getFromMinutes({ fromMin: 1440 * 7 }));
  }

  onToggleSevereUrgency($event: any): void {
    this.showSevereUrgency = $event.checked;
  }
  onToggleHighUrgency($event: any): void {
    this.showHighUrgency = $event.checked;
  }
  onToggleMediumUrgency($event: any): void {
    this.showMediumUrgency = $event.checked;
  }
  onToggleLowUrgency($event: any): void {
    this.showLowUrgency = $event.checked;
  }
  onToggleAcknowledged($event: any): void {
    this.showAcknowledged = $event.checked;
  }
  onToggleNetworkHealth($event: any): void {
    this.showNetworkHealth = $event.checked;
  }
  onToggleShowAPStatus($event: any): void {
    this.showAPStatus = $event.checked;
  }
  onToggleShowCapacity($event: any): void {
    this.showCapacity = $event.checked;
  }
}
