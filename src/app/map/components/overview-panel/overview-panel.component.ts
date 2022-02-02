import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { AlertSortType } from '@map/enums';
import { MapService } from '@map/services/map.service';
import * as AlertActions from '@store/alert/alert.actions';
import * as LocationSelectors from '@store/location/location.selectors';
import * as DeviceActions from '@store/device/device.actions';
import * as DeviceSelectors from '@store/device/device.selectors';
import { interval, Subject, Subscription } from 'rxjs';
import { debounceTime, startWith, takeUntil, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrls: ['./overview-panel.component.scss'],
})
export class OverviewPanelComponent implements OnInit, OnDestroy {
  selectedLocation$ = this.store.select(
    LocationSelectors.selectSelectedLocation
  );
  mapDateTime$ = this.mapService.mapDateTime$;
  displayedMapDateTime$ = this.mapService.displayedMapDateTime$;
  playbackSliderValue$ = this.mapService.playbackSliderValue$.pipe(
    tap(
      (playbackSliderValue: number) =>
        (this.playbackSliderValue = playbackSliderValue)
    )
  );
  playbackSliderMax$ = this.mapService.playbackSliderMax$.pipe(
    tap(
      (playbackSliderMax: number) =>
        (this.playbackSliderMax = playbackSliderMax)
    )
  );
  playbackSpeed$ = this.mapService.playbackSpeed$.pipe(
    tap((speed: number) => {
      this.playbackSpeed = speed;
      if (this.isPlaying) {
        this.startPlayback();
      }
    })
  );
  isExpanded$ = this.mapService.isOverviewExpanded$;
  isPlaybackLive$ = this.mapService.isPlaybackLive$.pipe(
    tap((isLive) => {
      this.isLive = isLive;
      this.mapService.updatePlaybackSlider(0);
    })
  );
  isPlaying$ = this.mapService.isPlaying$.pipe(
    tap((isPlaying: boolean) => {
      this.isPlaying = isPlaying;
      if (isPlaying === true && !this.isLive) {
        this.startPlayback();
      } else {
        this.playbackInterval$?.unsubscribe();
      }
    })
  );
  isDevicesLoading$ = this.store.select(DeviceSelectors.selectLoading).pipe(
    tap((isLoading) => {
      if (isLoading === false) {
        // this.mapService.updatePlaybackSlider(this.playbackSliderMax);
      }
    })
  );

  playbackInterval$ = new Subscription();
  mapTimeChangedDebouncer$: Subject<Date> = new Subject<Date>();

  isLive = false;
  isPlaying = false;
  playbackSpeed = 0;
  playbackSliderValue = 0;
  playbackSliderMax = this.mapService.playbackSliderMaxAmt;

  constructor(private mapService: MapService, private store: Store<RootState>) {
    this.mapTimeChangedDebouncer$
      .pipe(debounceTime(500))
      .subscribe((value) => this.getDevices(value));
  }

  getDevices(mapTime: Date): void {
    const mapTimeWithoutSeconds = moment(mapTime)
      .seconds(0)
      .milliseconds(0)
      .toDate();
    this.store.dispatch(
      DeviceActions.getSeenFromDateToDate({
        from: moment(mapTimeWithoutSeconds)
          .subtract(this.playbackSliderMax, 'minute')
          .toDate(),
        to: mapTimeWithoutSeconds,
      })
    );
    this.mapService.resetPlaybackSlider();
    this.mapService.resetPlaybackSliderMax();
  }

  ngOnInit(): void {}

  startPlayback(): void {
    this.playbackInterval$?.unsubscribe();
    if (
      this.playbackSpeed !== null &&
      this.playbackSpeed !== undefined &&
      !this.isLive
    ) {
      this.playbackInterval$ = interval(this.playbackSpeed * 1000)
        .pipe(
          startWith(0),
          takeUntil(this.mapService.stopPlay$),
          tap(() => {
            if (this.isLive) {
              this.playbackInterval$?.unsubscribe();
              return;
            }
            if (this.playbackSliderValue < this.playbackSliderMax) {
              this.mapService.updatePlaybackSlider(++this.playbackSliderValue);
            } else {
              this.mapService.updatePlaybackSlider(0);
            }
          })
        )
        .subscribe();
    }
  }

  onTopPanelHeightChanged(height: number): void {
    this.mapService.updateOverviewPanelHeight(height);
  }

  onAlertSortTypeChanged(sortType: AlertSortType): void {
    this.store.dispatch(AlertActions.setSortType({ sortType }));
  }

  onMapTimeChanged(mapTime: Date): void {
    this.mapService.stopPlayback();
    this.mapService.updateMapDateTime(mapTime);

    this.mapTimeChangedDebouncer$.next(mapTime);
  }

  onPlaybackSliderChanged(value: number): void {
    if (this.playbackSliderValue !== value) {
      this.mapService.stopPlayback();
      this.mapService.updatePlaybackSlider(value);
    }
  }
  onResetPlaybackSlider(): void {
    this.mapService.resetPlaybackSlider();
  }
  onPlaybackSpeedChanged(value: number): void {
    this.mapService.updatePlaybackSpeed(value);
  }

  onToggleAccessPoints(checked: boolean): void {
    this.mapService.setShowAccessPoints(checked);
  }
  onToggleDevices(checked: boolean): void {
    this.mapService.setShowDevices(checked);
  }
  onToggledStaticDevices(checked: boolean): void {
    this.mapService.setShowStaticDevices(checked);
  }
  onToggledClusters(checked: boolean): void {
    this.mapService.setShowClusters(checked);
  }

  onToggleExpanded(isExpanded?: boolean): void {
    this.mapService.toggleOverview(isExpanded);
  }

  onTogglePlayback(): void {
    this.mapService.togglePlayback();
  }

  onToggleLive(): void {
    this.mapService.toggleLive();
    this.mapService.updateMapDateTime(new Date());
  }

  onZoomIn(): void {
    this.mapService.mapZoomIn();
  }
  onZoomOut(): void {
    this.mapService.mapZoomOut();
  }

  ngOnDestroy(): void {
    this.playbackInterval$.unsubscribe();
  }
}
