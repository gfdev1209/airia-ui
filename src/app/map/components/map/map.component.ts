import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import * as LocationActions from '@store/location/location.actions';
import * as LocationSelectors from '@store/location/location.selectors';
import * as AccessPointActions from '@store/access-point/access-point.actions';
import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import * as DeviceActions from '@store/device/device.actions';
import * as DeviceSelectors from '@store/device/device.selectors';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import { AccountInfo } from '@azure/msal-browser';
import { MapService } from '@map/services/map.service';
import { MapViewComponent } from '@map/views/map-view/map-view.component';
import { interval, Subscription, timer } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  locations$ = this.store.select(LocationSelectors.selectAll).pipe(
    tap((locations) => {
      if (locations?.length > 0) {
        this.store.dispatch(
          LocationActions.select({ id: locations[0].locationId })
        );
        this.store.dispatch(BuildingActions.getAll());
        this.store.dispatch(AccessPointActions.getAll());
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
  accessPoints$ = this.store.select(AccessPointSelectors.selectAll);
  selectedAccessPoint$ = this.store.select(
    AccessPointSelectors.selectSelectedAccessPoint
  );
  devices$ = this.store.select(DeviceSelectors.selectAll);
  selectedDevice$ = this.store.select(DeviceSelectors.selectSelectedDevice);

  showDevices$ = this.mapService.showDevices$;
  showAccessPoints$ = this.mapService.showAccessPoints$;
  mapDateTime$ = this.mapService.mapDateTime$;

  zoomIn$: Subscription = new Subscription();
  zoomOut$: Subscription = new Subscription();
  devicePollingInterval$: Subscription = new Subscription();
  isPlaybackLive$: Subscription = new Subscription();

  accountInfo?: AccountInfo;

  // How often to poll for new devices when playback is live (in milliseconds)
  pollingTimeMS = 60000;
  isPollingForDevices = true;

  @ViewChild('mapView') mapView!: MapViewComponent;

  constructor(private store: Store<RootState>, private mapService: MapService) {
    this.store.dispatch(LocationActions.getAll());
  }

  ngOnInit(): void {
    this.zoomIn$ = this.mapService.zoomIn$.subscribe(() =>
      this.mapView?.onZoomIn()
    );
    this.zoomOut$ = this.mapService.zoomOut$.subscribe(() =>
      this.mapView?.onZoomOut()
    );
    this.isPlaybackLive$ = this.mapService.isPlaybackLive$
      .pipe(
        tap((state) => {
          if (state === true) {
            this.isPollingForDevices = true;
            this.pollForDevices();
          } else {
            this.isPollingForDevices = false;
          }
        })
      )
      .subscribe();

    this.mapService.mapDateTime$
      .pipe(
        tap((mapTime) => {
          if (mapTime !== null && !this.isPollingForDevices) {
            const mapTimeWithoutSeconds = moment(mapTime)
              .seconds(0)
              .milliseconds(0)
              .toDate();
            this.store.dispatch(
              DeviceActions.getSeenFromDateToDate({
                from: moment(mapTimeWithoutSeconds)
                  .subtract(1, 'minute')
                  .toDate(),
                to: mapTimeWithoutSeconds,
              })
            );
          }
        })
      )
      .subscribe();
  }

  pollForDevices(): void {
    this.devicePollingInterval$?.unsubscribe();
    this.devicePollingInterval$ = interval(this.pollingTimeMS)
      .pipe(
        startWith(0),
        takeUntil(this.mapService.stopPlay$),
        tap(() => this.mapService.updateMapDateTime(new Date())),
        tap(() =>
          this.store.dispatch(DeviceActions.getSeenFromMinutes({ fromMin: 1 }))
        )
      )
      .subscribe();
  }

  flyToBuildingComplete(): void {
    this.store.dispatch(BuildingActions.showOverview());
  }
  clickedBuildingId(mapboxId: number): void {
    this.store.dispatch(BuildingActions.selectByMapboxId({ mapboxId }));
  }
  clickedAccessPoint(id: number): void {
    this.store.dispatch(AccessPointActions.select({ id }));
  }
  ngOnDestroy(): void {
    this.zoomIn$?.unsubscribe();
    this.zoomOut$?.unsubscribe();
    this.isPlaybackLive$.unsubscribe();
    this.devicePollingInterval$?.unsubscribe();
  }
}
