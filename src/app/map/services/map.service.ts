import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public playbackSliderMaxAmt = 10;

  private overviewPanelHeight: BehaviorSubject<number> = new BehaviorSubject(0);
  overviewPanelHeight$ = this.overviewPanelHeight.asObservable();

  private mapDateTime: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  mapDateTime$ = this.mapDateTime.asObservable();

  // The datetime that is currently displaying data (eg. when scrubbing a range of devices)
  private displayedMapDateTime: BehaviorSubject<string> = new BehaviorSubject(
    new Date().toDateString()
  );
  displayedMapDateTime$ = this.displayedMapDateTime.asObservable();

  private isOverviewExpanded: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  isOverviewExpanded$ = this.isOverviewExpanded.asObservable();

  private isAnalyticsExpanded: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isAnalyticsExpanded$ = this.isAnalyticsExpanded.asObservable();

  private isPlaying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isPlaying$ = this.isPlaying.asObservable();

  private isPlaybackLive: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  isPlaybackLive$ = this.isPlaybackLive.asObservable();

  private playbackSliderValue: BehaviorSubject<number> = new BehaviorSubject(0);
  playbackSliderValue$ = this.playbackSliderValue.asObservable();

  private playbackSliderMax: BehaviorSubject<number> = new BehaviorSubject(
    this.playbackSliderMaxAmt
  );
  playbackSliderMax$ = this.playbackSliderMax.asObservable();

  private playbackSpeed: BehaviorSubject<number> = new BehaviorSubject(1);
  playbackSpeed$ = this.playbackSpeed.asObservable();

  stopPlay$: Subject<any> = new Subject();

  centerMap$: Subject<any> = new Subject();

  private zoomIn: Subject<void> = new Subject();
  zoomIn$ = this.zoomIn.asObservable();
  private zoomOut: Subject<void> = new Subject();
  zoomOut$ = this.zoomOut.asObservable();

  private showDevices: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  showDevices$ = this.showDevices.asObservable();

  private showClusters: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  showClusters$ = this.showClusters.asObservable();

  private filterSSID: BehaviorSubject<[]> = new BehaviorSubject([]);
  filterBySSID$ = this.filterSSID.asObservable();

  private showStaticDevices: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  showStaticDevices$ = this.showStaticDevices.asObservable();
  private showAccessPoints: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  showAccessPoints$ = this.showAccessPoints.asObservable();

  private isDrawing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isDrawing$ = this.isDrawing.asObservable();
  private deleteDrawing: Subject<void> = new Subject();
  deleteDrawing$ = this.deleteDrawing.asObservable();

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
  centerMap(): void {
    this.centerMap$.next();
  }
  toggleOverview(isExpanded?: boolean): void {
    if (isExpanded) {
      this.isOverviewExpanded.next(isExpanded);
    } else {
      this.isOverviewExpanded.next(!this.isOverviewExpanded.value);
    }
  }
  toggleAnalytics(isExpanded?: boolean): void {
    if (isExpanded) {
      this.isAnalyticsExpanded.next(isExpanded);
    } else {
      this.isAnalyticsExpanded.next(!this.isAnalyticsExpanded.value);
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
      // this.updateMapDateTime(new Date());
      this.resetPlaybackSlider();
      this.resetPlaybackSliderMax();
      // this.startPlayback();
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
  setShowClusters(show: boolean): void {
    this.showClusters.next(show);
  }

  setDrawing(value: boolean): void {
    this.isDrawing.next(value);
  }
  onDeleteDrawing(): void {
    this.deleteDrawing.next();
  }
  resetPlaybackSlider(): void {
    this.updatePlaybackSlider(0);
  }
  updatePlaybackSlider(value: number): void {
    if (value !== this.playbackSliderValue.value) {
      // this.stopPlayback();
      this.playbackSliderValue.next(value);
      this.updateDisplayedMapDateTime(
        moment(this.mapDateTime.value)
          .subtract(this.playbackSliderMax.value, 'minute')
          .add(value, 'minute')
          .toDate()
      );
    }
  }
  updatePlaybackSpeed(value: number): void {
    if (value !== this.playbackSpeed.value) {
      this.playbackSpeed.next(value);
    }
  }

  resetPlaybackSliderMax(): void {
    this.updatePlaybackSliderMax(this.playbackSliderMaxAmt);
  }
  updatePlaybackSliderMax(value: number): void {
    if (value !== this.playbackSliderMax.value) {
      this.playbackSliderMax.next(value);
    }
  }

  updateMapDateTime(newDate: Date): void {
    const curDate = moment(new Date()).seconds(0).milliseconds(0).toDate();
    newDate = moment(newDate).seconds(0).milliseconds(0).toDate();
    if (newDate <= curDate) {
      this.mapDateTime.next(newDate);
      this.updateDisplayedMapDateTime(newDate);
      if (newDate < curDate) {
        this.isPlaybackLive.next(false);
      }
    }
  }
  updateDisplayedMapDateTime(newDate: Date): void {
    this.displayedMapDateTime.next(
      moment(newDate)
        .tz(environment.timeZone)
        .format('ddd MMM DD, yy hh:mm A zz')
    );
  }

  filterBySSID(ssid:[]){
   
    this.filterSSID.next(ssid);
  }
}
