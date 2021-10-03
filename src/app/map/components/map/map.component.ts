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
import * as FloorActions from '@store/floor/floor.actions';
import * as FloorSelectors from '@store/floor/floor.selectors';
import { debounceTime, startWith, takeUntil, tap } from 'rxjs/operators';
import { MapService } from '@map/services/map.service';
import { MapViewComponent } from '@map/views/map-view/map-view.component';
import { interval, Subscription } from 'rxjs';
import * as moment from 'moment';
import { AccessPoint, Device, Floor } from '@map/models';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

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
        this.store.dispatch(FloorActions.getAll());
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
  floors: Floor[] = [];
  floors$ = this.store
    .select(FloorSelectors.selectAll)
    .pipe(tap((floors) => (this.floors = floors)))
    .subscribe();
  selectedFloorNumber$ = this.store
    .select(FloorSelectors.selectSelectedFloorNumber)
    .pipe(
      tap((floorNumber) => {
        this.selectedFloorNumber = floorNumber;
        this.filterDevices(this.devices);
        this.filterAccessPoints(this.accessPoints);
      })
    )
    .subscribe();
  selectedFloorNumber?: number | null;
  showBuildingOverview$ = this.store.select(
    BuildingSelectors.selectShowOverview
  );

  accessPoints$ = this.store
    .select(AccessPointSelectors.selectAll)
    .pipe(
      tap((accessPoints) => {
        this.accessPoints = accessPoints;
        this.filterAccessPoints(accessPoints);
      })
    )
    .subscribe();
  accessPoints: AccessPoint[] = [];
  accessPointsFiltered: AccessPoint[] = [];
  selectedAccessPoint$ = this.store.select(
    AccessPointSelectors.selectSelectedAccessPoint
  );
  devicesGrouped$ = this.store
    .select(DeviceSelectors.selectByMinutes)
    .pipe(
      tap((deviceGroups) => {
        if (!_.isEqual(this.deviceGroups, deviceGroups)) {
          this.deviceGroups = deviceGroups;
          this.displayDevicesByGroupIndex(
            this.deviceGroups,
            this.devicePlaybackAmount
          );
        }
      })
    )
    .subscribe();
  deviceGroups: { [id: string]: Device[] } = {};
  devices: Device[] = [];
  devicesFiltered: Device[] = [];
  selectedDevice$ = this.store.select(DeviceSelectors.selectSelectedDevice);
  deviceLoading$ = this.store.select(DeviceSelectors.selectLoading);

  playbackSliderValue$ = this.mapService.playbackSliderValue$
    .pipe(
      tap((value) => {
        this.displayDevicesByGroupIndex(this.deviceGroups, +value);
      })
    )
    .subscribe();

  showDevices$ = this.mapService.showDevices$;
  showStaticDevices$ = this.mapService.showStaticDevices$;
  showAccessPoints$ = this.mapService.showAccessPoints$;
  mapDateTime$ = this.mapService.mapDateTime$;
  mapDateTimeSubscription$: Subscription = new Subscription();
  mapDateTime: Date = new Date();

  zoomIn$: Subscription = new Subscription();
  zoomOut$: Subscription = new Subscription();
  devicePollingInterval$: Subscription = new Subscription();
  isPlaying$: Subscription = new Subscription();
  isPlaybackLive$: Subscription = new Subscription();

  // How often to poll for new devices when playback is live (in milliseconds)
  pollingTimeMS = 60000;
  isPollingForDevices = true;
  // Max amount of extra time to take when getting devices (in minutes)
  devicePlaybackAmount = 10;

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
            this.filterDevices([]);
            this.isPollingForDevices = true;
            this.pollForDevices();
          } else {
            this.isPollingForDevices = false;
          }
        })
      )
      .subscribe();

    this.mapDateTimeSubscription$ = this.mapService.mapDateTime$
      .pipe(
        debounceTime(500),
        tap((mapTime) => {
          this.mapDateTime = mapTime;
          if (mapTime !== null && !this.isPollingForDevices) {
            this.filterDevices([]);
            const mapTimeWithoutSeconds = moment(mapTime)
              .seconds(30)
              .milliseconds(0)
              .toDate();
            this.store.dispatch(
              DeviceActions.getSeenFromDateToDate({
                from: moment(mapTimeWithoutSeconds)
                  .subtract(this.devicePlaybackAmount, 'minute')
                  .toDate(),
                to: mapTimeWithoutSeconds,
              })
            );
          }
        })
      )
      .subscribe();
  }

  /** Display Devices on map based on the index of an array of Devices */
  displayDevicesByGroupIndex(
    deviceGroups: { [id: string]: Device[] },
    index: number
  ): void {
    // Sort the keys in the "deviceGroups" dictionary
    const sortedKeys = Object.keys(deviceGroups).sort();
    // Get the array of Devices at the specified key
    const deviceGroup = deviceGroups[sortedKeys[index]];
    this.devices = deviceGroup;
    this.filterDevices(deviceGroup);
    // Update date/time
    if (sortedKeys.length > 0 && !this.isPlaybackLive$) {
      // Subtract minutes from current map time based on the selected index of the Device array
      const updatedTime = moment(this.mapDateTime)
        .subtract(this.devicePlaybackAmount - index, 'minute')
        .toDate();
      this.updateDisplayedMapDateTime(updatedTime);
    }
  }

  /** Update the timestamp of currently displayed Devices */
  updateDisplayedMapDateTime(dateTime: Date): void {
    this.mapService.updateDisplayedMapDateTime(dateTime);
  }

  /** Filter an array of devices based on selected Floor */
  filterDevices(devices: Device[]): void {
    if (this.selectedFloorNumber && devices?.length > 0) {
      const buildingFloorsWithFloorNumber = this.floors.filter(
        (floor) => floor.floorId === this.selectedFloorNumber
      );
      this.devicesFiltered = devices.filter((device) =>
        buildingFloorsWithFloorNumber.find(
          (f) => f.id === device.buildingFloorId
        )
      );
    } else {
      this.devicesFiltered = devices;
    }
    this.mapView?.addDevices();
  }

  /** Filter Access Points based on selected Floor */
  filterAccessPoints(accessPoints: AccessPoint[]): void {
    if (this.selectedFloorNumber && accessPoints?.length > 0) {
      this.accessPointsFiltered = accessPoints.filter(
        (accessPoint) => accessPoint.floor?.floorId === this.selectedFloorNumber
      );
    } else {
      this.accessPointsFiltered = accessPoints;
    }
    this.mapView?.addAccessPoints();
  }

  /** Poll the Devices endpoint for updated data every "pollingTimeMS" interval */
  pollForDevices(): void {
    this.devicePollingInterval$?.unsubscribe();
    this.devicePollingInterval$ = interval(this.pollingTimeMS)
      .pipe(
        startWith(0),
        takeUntil(this.mapService.stopPlay$),
        tap(() => this.mapService.updateMapDateTime(new Date())),
        tap(() =>
          this.store.dispatch(
            DeviceActions.getSeenFromMinutes({
              fromMin: this.devicePlaybackAmount,
            })
          )
        )
      )
      .subscribe();
  }

  /** Display the building's overview once map has flown to location */
  flyToBuildingComplete(): void {
    this.store.dispatch(BuildingActions.showOverview());
  }
  /** Select the building upon click */
  clickedBuildingId(mapboxId: number): void {
    this.store.dispatch(BuildingActions.selectByMapboxId({ mapboxId }));
  }
  /** Select the Access Point upon click */
  clickedAccessPoint(id: number): void {
    this.store.dispatch(AccessPointActions.select({ id }));
  }
  ngOnDestroy(): void {
    this.selectedFloorNumber$?.unsubscribe();
    this.devicesGrouped$?.unsubscribe();
    this.playbackSliderValue$?.unsubscribe();
    this.accessPoints$?.unsubscribe();
    this.floors$?.unsubscribe();
    this.zoomIn$?.unsubscribe();
    this.zoomOut$?.unsubscribe();
    this.isPlaying$.unsubscribe();
    this.isPlaybackLive$.unsubscribe();
    this.devicePollingInterval$?.unsubscribe();
    this.mapDateTimeSubscription$?.unsubscribe();
  }
}
