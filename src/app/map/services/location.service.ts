import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('locations', httpClient);
  }

  // getAll(): Observable<Location[]> {
  //   return of([]).pipe(delay(1000));
  // }
  // get(id: number): Observable<Alert> {
  //   const alert = this.sampleAlerts.find(
  //     (alertInArray) => alertInArray.id === id
  //   );
  //   if (alert === undefined) {
  //     return throwError(`Alert with id = ${id} does not exist`);
  //   }
  //   return of(alert);
  // }
}
