import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private overviewPanelHeight: BehaviorSubject<number> = new BehaviorSubject(0);
  overviewPanelHeight$ = this.overviewPanelHeight.asObservable();

  private zoomIn: Subject<void> = new Subject();
  zoomIn$ = this.zoomIn.asObservable();
  private zoomOut: Subject<void> = new Subject();
  zoomOut$ = this.zoomOut.asObservable();

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
}
