import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertType } from '../enums';
import { Alert } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  sampleAlerts = [
    {
      id: 1,
      message: 'High level alert. Immediate action.',
      createdAt: new Date(),
      severity: 2,
      type: AlertType.High_Capacity,
    },
    {
      id: 2,
      message: 'Medium level alert, attention needed.',
      createdAt: new Date(),
      severity: 1,
      type: AlertType.Low_Capacity,
    },
    {
      id: 3,
      message: 'Soder Hall network health is optimal.',
      createdAt: new Date(),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 4,
      message: 'AP-2190-A is back online.',
      createdAt: new Date(),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 5,
      message: 'Soder Hall network health is optimal.',
      createdAt: new Date(),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 6,
      message: 'AP-2190-A is back online.',
      createdAt: new Date(),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 7,
      message: 'Soder Hall network health is optimal.',
      createdAt: new Date(),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 8,
      message: 'AP-2190-A is back online.',
      createdAt: new Date(),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 9,
      message: 'Soder Hall network health is optimal.',
      createdAt: new Date(),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 10,
      message: 'AP-2190-A is back online.',
      createdAt: new Date(),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 11,
      message: 'Soder Hall network health is optimal.',
      createdAt: new Date(),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 12,
      message: 'AP-2190-A is back online.',
      createdAt: new Date(),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
  ];
  private overviewPanelHeight: BehaviorSubject<number> = new BehaviorSubject(0);
  overviewPanelHeight$ = this.overviewPanelHeight.asObservable();

  private alerts: BehaviorSubject<Alert[]> = new BehaviorSubject(
    this.sampleAlerts
  );
  alerts$ = this.alerts.asObservable();

  constructor() {}

  updateOverviewPanelHeight(newHeight: number): void {
    this.overviewPanelHeight.next(newHeight);
  }
}
