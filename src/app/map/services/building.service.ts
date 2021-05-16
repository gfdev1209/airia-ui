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
      mapboxId: 1,
      name: 'University Centre',
      maxOccupancy: 1000,
      floors: 3,
    },
    {
      id: 2,
      createdAt: new Date(),
      clientId: 1,
      mapboxId: 132,
      name: 'Science Building',
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
