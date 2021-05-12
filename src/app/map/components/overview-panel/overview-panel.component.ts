import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { AlertSortType } from '../../enums';
import { Client } from '../../models';
import { MapService } from '../../services/map.service';
import * as AlertActions from '../../../store/alert/alert.actions';

@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrls: ['./overview-panel.component.scss'],
})
export class OverviewPanelComponent implements OnInit {
  client: Client = {
    id: 1,
    name: 'University Campus',
    coordLatitude: 123.23,
    coordLongitude: 12.32,
    createdAt: new Date(),
  };

  constructor(
    private mapService: MapService,
    private store: Store<RootState>
  ) {}

  ngOnInit(): void {}

  onTopPanelHeightChanged(height: number): void {
    this.mapService.updateOverviewPanelHeight(height);
  }

  onAlertSortTypeChanged(sortType: AlertSortType): void {
    this.store.dispatch(AlertActions.setSortType({ sortType }));
  }
}
