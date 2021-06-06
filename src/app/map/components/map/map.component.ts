import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import * as LocationActions from '@store/location/location.actions';
import * as LocationSelectors from '@store/location/location.selectors';
import { filter, tap } from 'rxjs/operators';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  AuthenticationResult,
  AccountInfo,
} from '@azure/msal-browser';
import { UserService } from '@map/services/user.service';
import { MapService } from '@map/services/map.service';
import { MapViewComponent } from '@map/views/map-view/map-view.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  locations$ = this.store.select(LocationSelectors.selectAll).pipe(
    tap((locations) => {
      if (locations?.length > 0) {
        this.store.dispatch(LocationActions.select({ id: locations[0].id }));
        this.store.dispatch(BuildingActions.getAll());
      }
    })
  );
  selectedLocation$ = this.store.select(
    LocationSelectors.selectSelectedLocation
  );
  buildings$ = this.store.select(BuildingSelectors.selectAll);
  selectedBuilding$ = this.store.select(
    BuildingSelectors.selectSelectedBuilding
  );
  showBuildingOverview$ = this.store.select(
    BuildingSelectors.selectShowOverview
  );
  zoomIn$: Subscription = new Subscription();
  zoomOut$: Subscription = new Subscription();

  accountInfo?: AccountInfo;

  @ViewChild('mapView') mapView!: MapViewComponent;

  constructor(
    private store: Store<RootState>,
    private authService: MsalService,
    private userService: UserService,
    private mapService: MapService
  ) {
    this.store.dispatch(LocationActions.getAll());
  }

  ngOnInit(): void {
    const accounts = this.authService?.instance?.getAllAccounts();
    if (accounts?.length > 0) {
      this.accountInfo = accounts[0];
      console.log(this.accountInfo);
      this.userService.getUserDetails().subscribe();
    }
    this.zoomIn$ = this.mapService.zoomIn$.subscribe(() =>
      this.mapView?.onZoomIn()
    );
    this.zoomOut$ = this.mapService.zoomOut$.subscribe(() =>
      this.mapView?.onZoomOut()
    );
  }

  flyToBuildingComplete(): void {
    this.store.dispatch(BuildingActions.showOverview());
  }
  clickedBuildingId(mapboxId: number): void {
    this.store.dispatch(BuildingActions.selectByMapboxId({ mapboxId }));
  }
  ngOnDestroy(): void {
    this.zoomIn$?.unsubscribe();
    this.zoomOut$?.unsubscribe();
  }
}
