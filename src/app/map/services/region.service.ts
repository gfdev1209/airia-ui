import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, share, tap } from 'rxjs/operators';
import { Region, Occupancy } from '@map/models';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import Helpers from '@core/utils/helpers';

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
      tap((occupancyData: Occupancy[]) =>
        this.setTimezoneOffsets(occupancyData)
      ),
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

  getOccupancyRange(id: number, from: Date, to: Date): Observable<Occupancy[]> {
    return this.http
      .get(
        `${this.apiUrl}/${id}/Occupancy/From/${Helpers.formatDateToJSON(
          from
        )}/To/${Helpers.formatDateToJSON(to)}`
      )
      .pipe(
        map((response: any) =>
          response?.rows?.$values.map(
            (responseJson: any) => new Occupancy(responseJson)
          )
        ),
        tap((occupancyData: Occupancy[]) =>
          this.setTimezoneOffsets(occupancyData)
        ),
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

  private setTimezoneOffsets(occupancyData: Occupancy[]): Occupancy[] {
    occupancyData.forEach((occupancy, index) => {
      occupancy.hour += environment.timeZoneOffsetUTC;
      if (occupancy.hour < 0) {
        occupancy.hour += 24;
        occupancy.day -= 1;
        // if (occupancy.day === 0) {
        //   occupancyData.splice(index, 1);
        // }
      }
    });
    return occupancyData;
  }

  mapResponseToObject<T>(response: any): T {
    const region = new Region(response) as any;
    return region;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Region(responseJson));
  }
}
