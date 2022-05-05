import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import * as RegionSelectors from '@store/region/region.selectors';
import * as RegionActions from '@store/region/region.actions';
import * as LocationActions from '@store/location/location.actions';
import * as LocationSelectors from '@store/location/location.selectors';
import * as AccessPointActions from '@store/access-point/access-point.actions';
import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import * as AlertSelectors from '@store/alert/alert.selectors';
import * as DeviceActions from '@store/device/device.actions';
import * as DeviceSelectors from '@store/device/device.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import * as FloorSelectors from '@store/floor/floor.selectors';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import { MapService } from '@map/services/map.service';
import { MapViewComponent } from '@map/views/map-view/map-view.component';
import { interval, Subject, Subscription } from 'rxjs';
import * as moment from 'moment';
import { AccessPoint, Building, Device, Floor, Region } from '@map/models';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { NotificationService } from '@shared/services/notification.service';
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
                this.store.dispatch(LocationActions.select({ id: locations[0].locationId }));
                this.store.dispatch(BuildingActions.getAll());
                this.store.dispatch(RegionActions.getAll());
                this.store.dispatch(RegionActions.getBuildingRegions());
                this.store.dispatch(AccessPointActions.getAll());
                this.store.dispatch(FloorActions.getAll());
            }
        })
    );
    selectedLocation$ = this.store.select(LocationSelectors.selectSelectedLocation);
    selectedAlert$ = this.store.select(AlertSelectors.selectSelectedAlert).pipe(
        tap((alert) => {
            if (alert?.region?.regionPolygon) {
                this.regionPolygon = alert.region.regionPolygon;
            } else if (!alert) {
                this.regionPolygon = null;
                this.store.dispatch(FloorActions.deselectFloorNumber());
            }
        })
    );
    buildings$ = this.store.select(BuildingSelectors.selectAll);
    selectedBuilding$ = this.store
        .select(BuildingSelectors.selectSelectedBuilding)
        .pipe(tap((building) => (this.selectedBuilding = building)))
        .subscribe();
    selectedBuilding?: Building | null;

    selectedRegion$ = this.store
        .select(RegionSelectors.selectSelectedRegion)
        .pipe(tap((region) => (this.selectedRegion = region)))
        .subscribe();
    selectedRegion?: Region | null;
    updateRegionSuccess$ = this.actions$.pipe(ofType(RegionActions.updateRegionPolygonSuccess)).subscribe((data: any) => {
        this.notificationService.displaySuccess('Successfully updated Region shape');
        this.router.navigate([`/settings/region/${this.selectedRegion?.id}`]);
    });

    isEditingBuildingShape$ = this.store.select(BuildingSelectors.selectEditingShape);
    isEditingRegionShape$ = this.store.select(RegionSelectors.selectEditingShape);
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
    showBuildingOverview$ = this.store.select(BuildingSelectors.selectShowOverview);

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
    selectedAccessPoint$ = this.store.select(AccessPointSelectors.selectSelectedAccessPoint);
    devicesGrouped$ = this.store
        .select(DeviceSelectors.selectByMinutes)
        .pipe(
            tap((deviceGroups) => {
                if (!_.isEqual(this.deviceGroups, deviceGroups)) {
                    this.deviceGroups = deviceGroups;
                    this.displayDevicesByGroupIndex(this.deviceGroups, this.devicePlaybackAmount);
                }
            })
        )
        .subscribe();
    deviceGroups: { [id: string]: Device[] } = {};
    devices: Device[] = [];
    devicesFiltered: Device[] = [];
    selectedDevice$ = this.store.select(DeviceSelectors.selectSelectedDevice);
    deviceLoading$ = this.store.select(DeviceSelectors.selectLoading).pipe(
        tap((loading) => {
            if (loading === true) {
                this.filterDevices([]);
            }
        })
    );

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
    showClusters$ = this.mapService.showClusters$;
    mapDateTime$ = this.mapService.mapDateTime$;
    mapDateTimeSubscription$: Subscription = new Subscription();
    mapDateTime: Date = new Date();

    // Polygon coordinates of selected region
    regionPolygon?: number[][] | null;

    zoomIn$: Subscription = new Subscription();
    zoomOut$: Subscription = new Subscription();
    centerMap$: Subscription = new Subscription();
    devicePollingInterval$: Subscription = new Subscription();
    isPlaying$: Subscription = new Subscription();
    isPlaybackLive$: Subscription = new Subscription();

    // Drawing
    isDrawing$ = this.mapService.isDrawing$;
    deleteDrawing$: Subscription = new Subscription();

    // How often to poll for new devices when playback is live (in milliseconds)
    pollingTimeMS = 60000;
    isPollingForDevices = true;
    // Max amount of extra time to take when getting devices (in minutes)
    devicePlaybackAmount = 0;

    @ViewChild('mapView') mapView!: MapViewComponent;

    constructor(
        private actions$: Actions,
        private store: Store<RootState>,
        private mapService: MapService,
        private notificationService: NotificationService,
        private router: Router
    ) {
        this.store.dispatch(LocationActions.get({ id: environment.defaultLocationId }));
    }

    ngOnInit(): void {
        this.zoomIn$ = this.mapService.zoomIn$.subscribe(() => this.mapView?.onZoomIn());
        this.zoomOut$ = this.mapService.zoomOut$.subscribe(() => this.mapView?.onZoomOut());
        this.centerMap$ = this.mapService.centerMap$.subscribe(() => this.mapView?.onCenterMap());
        this.deleteDrawing$ = this.mapService.deleteDrawing$.subscribe(() => this.mapView?.onDeleteDrawing());
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
                tap((mapTime) => {
                    this.mapDateTime = mapTime;
                })
            )
            .subscribe();
    }

    /** Display Devices on map based on the index of an array of Devices */
    displayDevicesByGroupIndex(deviceGroups: { [id: string]: Device[] }, index: number): void {
        // Sort the keys in the "deviceGroups" dictionary
        const sortedKeys = Object.keys(deviceGroups).sort();
        // Get the array of Devices at the specified key
        const deviceGroup = deviceGroups[sortedKeys[index]];

        // Temporary workaround - Display ALL devices, rather than grouped by minute if this is not an Alert
        // if (!this.regionPolygon) {
        //   deviceGroup = [];
        //   for (const key in deviceGroups) {
        //     if (key) {
        //       const value = deviceGroups[key];
        //       value.forEach((device) => {
        //         deviceGroup.push(device);
        //       });
        //     }
        //   }
        // }
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
            const buildingFloorsWithFloorNumber = this.floors.filter((floor) => floor.floorId === this.selectedFloorNumber);
            this.devicesFiltered = devices.filter((device) => buildingFloorsWithFloorNumber.find((f) => f.id === device.buildingFloorId));
        } else {
            this.devicesFiltered = devices;
        }
        this.mapView?.addDevices();
    }

    /** Filter Access Points based on selected Floor */
    filterAccessPoints(accessPoints: AccessPoint[]): void {
        if (this.selectedFloorNumber && accessPoints?.length > 0) {
            this.accessPointsFiltered = accessPoints.filter((accessPoint) => accessPoint.floor?.floorId === this.selectedFloorNumber);
        } else {
            this.accessPointsFiltered = accessPoints;
        }
        this.mapView?.addAccessPointsToMap();
    }

    /** Poll the Devices endpoint for updated data every "pollingTimeMS" interval */
    pollForDevices(): void {
        this.devicePollingInterval$?.unsubscribe();
        this.devicePollingInterval$ = interval(this.pollingTimeMS)
            .pipe(
                startWith(0),
                takeUntil(this.mapService.stopPlay$),
                tap(() => this.mapService.updateMapDateTime(new Date())),
                tap(() => {
                    this.store.dispatch(DeviceActions.getSeenFromMinutes({ fromMin: 1 }));
                    // const curDate = moment(new Date())
                    //   .subtract(1, 'minute')
                    //   .seconds(0)
                    //   .milliseconds(0)
                    //   .toDate();
                    // this.store.dispatch(
                    //   DeviceActions.getSeenFromDate({
                    //     date: curDate,
                    //   })
                    // );
                })
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

    onDrawingComplete(): void {
        this.mapService.setDrawing(false);
    }
    onUpdateBuildingShape(coordinates: number[][]): void {
        if (this.selectedBuilding) {
            this.store.dispatch(
                BuildingActions.updateBuildingPolygon({
                    id: this.selectedBuilding.id,
                    polygon: coordinates,
                })
            );
        }
    }
    onUpdateRegionShape(coordinates: number[][]): void {
        if (this.selectedRegion) {
            this.store.dispatch(
                RegionActions.updateRegionPolygon({
                    id: this.selectedRegion.id,
                    polygon: coordinates,
                })
            );
        }
    }
    onCancelUpdateRegionShape(): void {
        this.store.dispatch(RegionActions.deselect());
    }

    ngOnDestroy(): void {
        this.selectedFloorNumber$?.unsubscribe();
        this.devicesGrouped$?.unsubscribe();
        this.playbackSliderValue$?.unsubscribe();
        this.accessPoints$?.unsubscribe();
        this.floors$?.unsubscribe();
        this.zoomIn$?.unsubscribe();
        this.zoomOut$?.unsubscribe();
        this.deleteDrawing$?.unsubscribe();
        this.isPlaying$.unsubscribe();
        this.isPlaybackLive$.unsubscribe();
        this.devicePollingInterval$?.unsubscribe();
        this.mapDateTimeSubscription$?.unsubscribe();
        this.selectedBuilding$.unsubscribe();
        this.selectedRegion$.unsubscribe();
        this.updateRegionSuccess$.unsubscribe();
    }
}
