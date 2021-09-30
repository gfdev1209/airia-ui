import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private overviewPanelHeight: BehaviorSubject<number> = new BehaviorSubject(0);
  overviewPanelHeight$ = this.overviewPanelHeight.asObservable();

  private mapDateTime: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  mapDateTime$ = this.mapDateTime.asObservable();

  private isOverviewExpanded: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isOverviewExpanded$ = this.isOverviewExpanded.asObservable();

  private isPlaying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  isPlaying$ = this.isPlaying.asObservable();

  private isPlaybackLive: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  isPlaybackLive$ = this.isPlaybackLive.asObservable();

  private playbackSliderValue: BehaviorSubject<number> = new BehaviorSubject(0);
  playbackSliderValue$ = this.playbackSliderValue.asObservable();

  private playbackSpeed: BehaviorSubject<number> = new BehaviorSubject(1);
  playbackSpeed$ = this.playbackSpeed.asObservable();

  stopPlay$: Subject<any> = new Subject();

  private zoomIn: Subject<void> = new Subject();
  zoomIn$ = this.zoomIn.asObservable();
  private zoomOut: Subject<void> = new Subject();
  zoomOut$ = this.zoomOut.asObservable();

  private showDevices: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  showDevices$ = this.showDevices.asObservable();

  private showStaticDevices: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  showStaticDevices$ = this.showStaticDevices.asObservable();
  private showAccessPoints: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  showAccessPoints$ = this.showAccessPoints.asObservable();

  constructor() {}

  updateOverviewPanelHeight(newHeight: number): void {
    this.overviewPanelHeight.next(newHeight);
  }

  mapZoomIn(): void {
    this.zoomIn.next();
  }
  mapZoomOut(): void {
    this.zoomOut.next();
  }
  toggleOverview(isExpanded?: boolean): void {
    if (isExpanded) {
      this.isOverviewExpanded.next(isExpanded);
    } else {
      this.isOverviewExpanded.next(!this.isOverviewExpanded.value);
    }
  }

  startPlayback(): void {
    this.stopPlay$.next(false);
    this.isPlaying.next(true);
  }
  stopPlayback(): void {
    this.stopPlay$.next();
    this.isPlaying.next(false);
  }
  togglePlayback(): void {
    this.stopPlay$.next();
    this.isPlaying.next(!this.isPlaying.value);
  }
  toggleLive(): void {
    this.stopPlay$.next();
    this.isPlaybackLive.next(!this.isPlaybackLive.value);
    if (this.isPlaybackLive.value === true) {
      this.updateMapDateTime(new Date());
      this.resetPlaybackSlider();
      this.startPlayback();
    }
  }

  setShowDevices(show: boolean): void {
    this.showDevices.next(show);
  }
  setShowStaticDevices(show: boolean): void {
    this.showStaticDevices.next(show);
  }
  setShowAccessPoints(show: boolean): void {
    this.showAccessPoints.next(show);
  }

  resetPlaybackSlider(): void {
    this.updatePlaybackSlider(0);
  }
  updatePlaybackSlider(value: number): void {
    if (value !== this.playbackSliderValue.value) {
      // this.stopPlayback();
      this.playbackSliderValue.next(value);
    }
  }
  updatePlaybackSpeed(value: number): void {
    if (value !== this.playbackSpeed.value) {
      this.playbackSpeed.next(value);
    }
  }

  updateMapDateTime(newDate: Date): void {
    const curDate = new Date();
    if (
      moment(newDate).seconds(0).milliseconds(0) <=
      moment(curDate).seconds(0).milliseconds(0)
    ) {
      this.mapDateTime.next(newDate);
      if (
        moment(newDate).seconds(0).milliseconds(0) >=
        moment(curDate).seconds(0).milliseconds(0)
      ) {
        this.isPlaybackLive.next(true);
      } else {
        this.isPlaybackLive.next(false);
      }
    }
  }
}
