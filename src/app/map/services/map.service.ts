import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private overviewPanelHeight: BehaviorSubject<number> = new BehaviorSubject(0);
  overviewPanelHeight$ = this.overviewPanelHeight.asObservable();

  private mapDateTime: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  mapDateTime$ = this.mapDateTime.asObservable();

  private isPlaybackLive: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  isPlaybackLive$ = this.isPlaybackLive.asObservable();

  stopPlay$: Subject<any> = new Subject();

  private zoomIn: Subject<void> = new Subject();
  zoomIn$ = this.zoomIn.asObservable();
  private zoomOut: Subject<void> = new Subject();
  zoomOut$ = this.zoomOut.asObservable();

  private showDevices: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  showDevices$ = this.showDevices.asObservable();
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

  startPlayback(): void {
    this.stopPlay$.next(false);
  }
  stopPlayback(): void {
    this.stopPlay$.next();
    this.isPlaybackLive.next(false);
  }
  togglePlayback(): void {
    this.stopPlay$.next();
    this.isPlaybackLive.next(!this.isPlaybackLive.value);
  }

  setShowDevices(show: boolean): void {
    this.showDevices.next(show);
  }
  setShowAccessPoints(show: boolean): void {
    this.showAccessPoints.next(show);
  }

  updateMapDateTime(newDate: Date): void {
    this.mapDateTime.next(newDate);
  }
}
