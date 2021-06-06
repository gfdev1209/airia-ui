import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { AlertSortType } from '@map/enums';
import { MapService } from '@map/services/map.service';
import * as AlertActions from '@store/alert/alert.actions';
import * as LocationSelectors from '@store/location/location.selectors';

@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrls: ['./overview-panel.component.scss'],
})
export class OverviewPanelComponent implements OnInit {
  selectedLocation$ = this.store.select(
    LocationSelectors.selectSelectedLocation
  );
  mapDateTime$ = this.mapService.mapDateTime$;

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

  onMapTimeChanged(mapTime: Date): void {
    this.mapService.updateMapDateTime(mapTime);
  }

  onZoomIn(): void {
    this.mapService.mapZoomIn();
  }
  onZoomOut(): void {
    this.mapService.mapZoomOut();
  }
}
