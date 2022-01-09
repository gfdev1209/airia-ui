import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, share, tap } from 'rxjs/operators';
import { Region, Occupancy } from '@map/models';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegionService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Regions', httpClient);
  }
  getOccupancy(
    id: number,
    year?: number,
    month?: number,
    day?: number
  ): Observable<Occupancy[]> {
    let queryParams = `${id}/Occupancy?year=${year}&month=${month}`;
    if (day) {
      queryParams += `&day=${day}`;
    }
    return this.http.get(`${this.apiUrl}/${queryParams}`).pipe(
      map((response: any) =>
        response?.rows?.$values.map(
          (responseJson: any) => new Occupancy(responseJson)
        )
      ),
      tap((occupancyData: Occupancy[]) => {
        occupancyData.forEach((occupancy, index) => {
          occupancy.hour += environment.timeZoneOffsetUTC;
          // 4 - 5 = -1
          // -1 + 24 = 23;
          if (occupancy.hour < 0) {
            occupancy.hour += 24;
            occupancy.day -= 1;
            // if (occupancy.day === 0) {
            //   occupancyData.splice(index, 1);
            // }
          }
        });
      }),
      map((occupancyData: Occupancy[]) =>
        occupancyData.filter((element) => element.day !== 0)
      ),
      tap((occupancyData: Occupancy[]) =>
        occupancyData.sort((a, b) => a.hour - b.hour)
      ),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }
  mapResponseToObject<T>(response: any): T {
    const region = new Region(response) as any;
    return region;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Region(responseJson));
  }
}
