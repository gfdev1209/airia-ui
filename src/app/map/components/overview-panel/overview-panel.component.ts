import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { AlertSortType } from '@map/enums';
import { Tenant } from '@map/models';
import { MapService } from '@map/services/map.service';
import * as AlertActions from '@store/alert/alert.actions';

@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrls: ['./overview-panel.component.scss'],
})
export class OverviewPanelComponent implements OnInit {
  tenant: Tenant = {
    id: 1,
    name: 'University Campus',
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
    console.log(sortType);
    this.store.dispatch(AlertActions.setSortType({ sortType }));
  }
}
