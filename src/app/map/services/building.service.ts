import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Building } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
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

  constructor() {}

  getAll(): Observable<Building[]> {
    return of(this.sampleBuildings).pipe(delay(100));
  }
  get(id: number): Observable<Building> {
    const alert = this.sampleBuildings.find(
      (alertInArray) => alertInArray.id === id
    );
    if (alert === undefined) {
      return throwError(`Alert with id = ${id} does not exist`);
    }
    return of(alert);
  }
  search(term: string): Observable<Building[]> {
    return of(
      this.sampleBuildings.filter((building) =>
        building.name.toLowerCase().includes(term.toLowerCase())
      )
    ).pipe(delay(250));
  }
}
