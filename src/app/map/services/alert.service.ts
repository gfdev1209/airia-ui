import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AlertType } from '@map/enums';
import { Alert } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  sampleAlerts: Alert[] = [
    {
      id: 1,
      message: 'High level alert. Immediate action.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 2,
      type: AlertType.High_Capacity,
    },
    {
      id: 2,
      message: 'Medium level alert, attention needed.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 1,
      type: AlertType.Low_Capacity,
    },
    {
      id: 3,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 4,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 5,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 6,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 7,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 8,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 9,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 10,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 11,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 12,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 13,
      message: 'High level alert. Immediate action.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 2,
      type: AlertType.High_Capacity,
    },
    {
      id: 14,
      message: 'Medium level alert, attention needed.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 1,
      type: AlertType.Low_Capacity,
    },
    {
      id: 15,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 16,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 17,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 18,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 19,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 20,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 21,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 22,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 23,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 24,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
    {
      id: 25,
      message: 'Soder Hall network health is optimal.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Network_Health,
    },
    {
      id: 26,
      message: 'AP-2190-A is back online.',
      createdAt: this.getRandomDate(new Date(2021, 2), new Date()),
      severity: 0,
      type: AlertType.Access_Point_Online,
    },
  ];

  constructor() {}

  getAll(): Observable<Alert[]> {
    return of(this.sampleAlerts).pipe(delay(1000));
  }
  get(id: number): Observable<Alert> {
    const alert = this.sampleAlerts.find(
      (alertInArray) => alertInArray.id === id
    );
    if (alert === undefined) {
      return throwError(`Alert with id = ${id} does not exist`);
    }
    return of(alert);
  }
  getRandomDate(from: Date, to: Date): Date {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
  }
}
