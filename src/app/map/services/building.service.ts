import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Alert, Building } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  sampleBuildings: Building[] = [
    {
      id: 1,
      createdAt: new Date(),
      clientId: 1,
      mapboxId: 45277690,
      name: 'University Centre',
      coordLatitude: 35.047873555387994,
      coordLongitude: -85.2983487354471,
      maxOccupancy: 1000,
      floors: 3,
    },
    {
      id: 2,
      createdAt: new Date(),
      clientId: 1,
      mapboxId: 66955070,
      name: 'UTC Stagmaier Dorms',
      coordLatitude: 35.04529094226686,
      coordLongitude: -85.29839712222879,
      maxOccupancy: 500,
      floors: 1,
    },
    {
      id: 3,
      createdAt: new Date(),
      clientId: 1,
      mapboxId: 148490310,
      name: 'UTC Metro Building',
      coordLatitude: 35.04700133238397,
      coordLongitude: -85.30368804441464,
      maxOccupancy: 500,
      floors: 1,
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
