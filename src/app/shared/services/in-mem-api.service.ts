import { Injectable } from '@angular/core';
import { AlertType } from '@map/enums';
import { Alert, Building, Floor, Location } from '@map/models';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemApiService implements InMemoryDbService {
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
  sampleLocations: Location[] = [
    {
      id: 1,
      tenantId: 1,
      name: 'University of Tenessee at Chattanooga',
      coordLatitude: 35.0458509,
      coordLongitude: -85.2974959,
      createdAt: new Date(),
    },
    {
      id: 2,
      tenantId: 1,
      name: 'University of Lethbridge',
      coordLatitude: 49.728668,
      coordLongitude: -112.832779,
      createdAt: new Date(),
    },
  ];
  sampleBuildings: Building[] = [
    {
      id: 1,
      locationId: 1,
      createdAt: new Date(),
      mapboxId: 45277690,
      name: 'University Centre',
      coordLatitude: 35.047873555387994,
      coordLongitude: -85.2983487354471,
      floors: [
        {
          id: 1,
          buildingId: 1,
          maxOccupancy: 500,
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 2,
      locationId: 1,
      createdAt: new Date(),
      mapboxId: 66955070,
      name: 'UTC Stagmaier Dorms',
      coordLatitude: 35.04529094226686,
      coordLongitude: -85.29839712222879,
      floors: [
        {
          id: 2,
          buildingId: 2,
          maxOccupancy: 250,
          createdAt: new Date(),
        },
        {
          id: 3,
          buildingId: 2,
          maxOccupancy: 300,
          createdAt: new Date(),
        },
        {
          id: 4,
          buildingId: 2,
          maxOccupancy: 225,
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 3,
      locationId: 1,
      createdAt: new Date(),
      mapboxId: 148490310,
      name: 'UTC Metro Building',
      coordLatitude: 35.04700133238397,
      coordLongitude: -85.30368804441464,
      floors: [
        {
          id: 5,
          buildingId: 3,
          maxOccupancy: 1500,
          createdAt: new Date(),
        },
      ],
    },
  ];
  sampleFloors: Floor[] = [
    {
      id: 1,
      buildingId: 1,
      maxOccupancy: 1000,
      createdAt: new Date(),
    },
    {
      id: 2,
      buildingId: 1,
      maxOccupancy: 500,
      createdAt: new Date(),
    },
  ];
  // tslint:disable-next-line:typedef
  createDb() {
    const alerts = this.sampleAlerts;
    const locations = this.sampleLocations;
    const buildings = this.sampleBuildings;
    const floors = this.sampleFloors;

    return { alerts, buildings, locations, floors };
  }

  getRandomDate(from: Date, to: Date): Date {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
  }
}
