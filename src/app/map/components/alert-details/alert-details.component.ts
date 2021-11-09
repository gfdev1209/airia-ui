import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as AlertSelectors from '@store/alert/alert.selectors';
import * as AlertActions from '@store/alert/alert.actions';
import * as DeviceActions from '@store/device/device.actions';
import { Alert } from '@map/models';
import * as UserSelectors from '@store/user/user.selectors';
import { MapService } from '@map/services/map.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-alert-details',
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.scss'],
})
export class AlertDetailsComponent implements OnInit {
  selectedAlert$ = this.store.select(AlertSelectors.selectSelectedAlert);
  self$ = this.store.select(UserSelectors.selectSelf);
  loading$ = this.store.select(AlertSelectors.selectLoading);

  constructor(
    private store: Store<RootState>,
    private mapService: MapService
  ) {}

  ngOnInit(): void {}

  onAcknowledgeAlert(alert: Alert): void {
    this.store.dispatch(AlertActions.acknowledgeAlert({ alert }));
  }

  onViewAlertPlayback(alert: Alert): void {
    this.mapService.stopPlayback();
    this.mapService.updatePlaybackSlider(0);
    this.mapService.updatePlaybackSliderMax(
      moment
        .duration(moment(alert.alertEndTime).diff(alert.alertStartTime))
        .asMinutes()
    );
    this.mapService.updateMapDateTime(alert.alertEndTimeLocal);
    this.mapService.startPlayback();
    this.store.dispatch(
      DeviceActions.getSeenFromDateToDate({
        from: alert.alertStartTimeLocal,
        to: alert.alertEndTimeLocal,
      })
    );
  }

  closeAlert(): void {
    this.store.dispatch(AlertActions.deselect());
  }
}
