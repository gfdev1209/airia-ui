import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Building } from '@map/models';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BuildingService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Buildings', httpClient);
  }

  mapResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Building(responseJson));
  }

  // getAll(): Observable<Building[]> {
  //   return of(this.sampleBuildings).pipe(delay(100));
  // }
  // get(id: number): Observable<Building> {
  //   const alert = this.sampleBuildings.find(
  //     (alertInArray) => alertInArray.id === id
  //   );
  //   if (alert === undefined) {
  //     return throwError(`Alert with id = ${id} does not exist`);
  //   }
  //   return of(alert);
  // }
  // search(term: string): Observable<Building[]> {
  //   return of(
  //     this.sampleBuildings.filter((building) =>
  //       building.name.toLowerCase().includes(term.toLowerCase())
  //     )
  //   ).pipe(delay(250));
  // }
}
