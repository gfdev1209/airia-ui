import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { Location } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Locations', httpClient);
  }

  mapResponseToObject<T>(response: any): T {
    return new Location(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Location(responseJson));
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
