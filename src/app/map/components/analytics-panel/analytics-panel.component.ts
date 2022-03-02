import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '@map/services/map.service';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as LocationSelectors from '@store/location/location.selectors';
import * as DeviceSelectors from '@store/device/device.selectors';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import { Occupancy } from '@map/models';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { RegionService } from '@map/services/region.service';

@Component({
  selector: 'app-analytics-panel',
  templateUrl: './analytics-panel.component.html',
  styleUrls: ['./analytics-panel.component.scss'],
})
export class AnalyticsPanelComponent implements OnInit, OnDestroy {
  isExpanded$ = this.mapService.isAnalyticsExpanded$;
  selectedLocation$ = this.store.select(
    LocationSelectors.selectSelectedLocation
  );
  displayedMapDateTime$ = this.mapService.displayedMapDateTime$;
  occupancy$?: Observable<Occupancy>;

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  analyticsPollingInterval$: Subscription = new Subscription();
  // How often to poll for new devices when playback is live (in milliseconds)
  pollingTimeMS = 300000;
  isPollingForAnalytics = true;

  private regionId = environment.entireRegionId;
  private curDate: Date = new Date();

  constructor(
    private mapService: MapService,
    private store: Store<RootState>,
    private regionService: RegionService
  ) {}

  ngOnInit(): void {
    this.pollForAnalytics();
  }

  pollForAnalytics(): void {
    this.analyticsPollingInterval$?.unsubscribe();
    this.analyticsPollingInterval$ = interval(this.pollingTimeMS)
      .pipe(
        startWith(0),
        takeUntil(this.mapService.stopPlay$),
        tap(() => this.mapService.updateMapDateTime(new Date())),
        tap(() => {
          this.getOccupancyData(
            this.regionId,
            moment(this.curDate).year(),
            moment(this.curDate).month(),
            moment(this.curDate).date()
          );
        })
      )
      .subscribe();
  }

  getOccupancyData(
    regionId: number,
    year: number,
    month: number,
    day?: number
  ): void {
    this.loading.next(true);
    this.occupancy$ = this.regionService
      .getOccupancyRange(
        regionId,
        moment(new Date(year, month, day))
          .utc()
          .startOf('day')
          .subtract(environment.timeZoneOffsetUTC, 'hour')
          .toDate(),
        moment(new Date(year, month, day))
          .utc()
          .endOf('day')
          .subtract(environment.timeZoneOffsetUTC, 'hour')
          .toDate()
      )
      .pipe(
        tap((response) => {
          this.loading.next(false);
        })
      );
  }

  onToggleExpanded(isExpanded?: boolean): void {
    this.mapService.toggleAnalytics(isExpanded);
  }

  ngOnDestroy(): void {
    this.analyticsPollingInterval$?.unsubscribe();
  }
}
