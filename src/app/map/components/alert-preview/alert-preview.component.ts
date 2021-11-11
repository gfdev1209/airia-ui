import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { Alert } from '../../models';
import * as AlertActions from '@store/alert/alert.actions';
import { MapService } from '@map/services/map.service';

@Component({
  selector: 'app-alert-preview',
  templateUrl: './alert-preview.component.html',
  styleUrls: ['./alert-preview.component.scss'],
})
export class AlertPreviewComponent {
  @Input() alert?: Alert;
  @Input() isSelected = false;

  constructor(
    private store: Store<RootState>,
    private mapService: MapService
  ) {}

  alertSelected(alert: Alert): void {
    this.store.dispatch(AlertActions.deselect());
    this.mapService.resetPlaybackSlider();
    this.mapService.stopPlayback();
    this.store.dispatch(AlertActions.select({ id: alert.id }));
  }
}
