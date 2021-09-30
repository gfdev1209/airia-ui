import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { AlertSortType } from '@map/enums';
import { MapService } from '@map/services/map.service';
import * as AlertActions from '@store/alert/alert.actions';
import * as LocationSelectors from '@store/location/location.selectors';
import * as DeviceSelectors from '@store/device/device.selectors';
import { interval, Subscription } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';

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
  playbackSliderValue$ = this.mapService.playbackSliderValue$.pipe(
    tap(
      (playbackSliderValue: number) =>
        (this.playbackSliderValue = playbackSliderValue)
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
    tap((isLive) => (this.isLive = isLive))
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
      if (isLoading === false && this.isLive === true) {
        this.onPlaybackSliderChanged(10);
      }
    })
  );

  playbackInterval$ = new Subscription();

  isLive = false;
  isPlaying = false;
  playbackSpeed = 0;
  playbackSliderValue = 0;

  constructor(
    private mapService: MapService,
    private store: Store<RootState>
  ) {}

  ngOnInit(): void {}

  startPlayback(): void {
    this.playbackInterval$?.unsubscribe();
    if (this.playbackSpeed !== null && this.playbackSpeed !== undefined) {
      this.playbackInterval$ = interval(this.playbackSpeed * 1000)
        .pipe(
          startWith(0),
          takeUntil(this.mapService.stopPlay$),
          tap(() => {
            if (this.playbackSliderValue < 10) {
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
  }

  onPlaybackSliderChanged(value: number): void {
    this.mapService.stopPlayback();
    this.mapService.updatePlaybackSlider(value);
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

  onToggleExpanded(isExpanded?: boolean): void {
    this.mapService.toggleOverview(isExpanded);
  }

  onTogglePlayback(): void {
    this.mapService.togglePlayback();
  }

  onToggleLive(): void {
    this.mapService.toggleLive();
  }

  onZoomIn(): void {
    this.mapService.mapZoomIn();
  }
  onZoomOut(): void {
    this.mapService.mapZoomOut();
  }

  onToggleTest(): void {
    this.mapService.toggleLive();
  }

  ngOnDestroy(): void {
    this.playbackInterval$.unsubscribe();
  }
}
