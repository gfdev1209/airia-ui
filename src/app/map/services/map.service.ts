import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlertType } from '../enums';
import { Alert } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private overviewPanelHeight: BehaviorSubject<number> = new BehaviorSubject(0);
  overviewPanelHeight$ = this.overviewPanelHeight.asObservable();

  constructor() {}

  updateOverviewPanelHeight(newHeight: number): void {
    this.overviewPanelHeight.next(newHeight);
  }
}
