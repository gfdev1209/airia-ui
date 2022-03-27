import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, share, tap } from 'rxjs/operators';
import { Region, Occupancy } from '@map/models';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import Helpers from '@core/utils/helpers';
import { OccupancyStat } from '@map/models/occupancy-stat.model';
import * as moment from 'moment';

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
  ): Observable<Occupancy> {
    let queryParams = `${id}/Occupancy?year=${year}&month=${month}`;
    if (day) {
      queryParams += `&day=${day}`;
    }
    return this.http.get(`${this.apiUrl}/${queryParams}`).pipe(
      map((response: any) => new Occupancy(response)),
      tap((occupancyData: Occupancy) =>
        this.setTimezoneOffsets(occupancyData.occupancyStats)
      ),
      tap((occupancyData: Occupancy) =>
        occupancyData.occupancyStats.filter((element) => element.day !== 0)
      ),
      tap((occupancyData: Occupancy) =>
        occupancyData.occupancyStats.sort((a, b) => a.hour - b.hour)
      ),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }

  getOccupancyRange(id: number, from: Date, to: Date): Observable<Occupancy> {
    return this.http
      .get(
        `${this.apiUrl}/${id}/Occupancy/From/${Helpers.formatDateToJSON(
          from
        )}/To/${Helpers.formatDateToJSON(to)}`
      )
      .pipe(
        map((response: any) => (response = new Occupancy(response))),
        tap((occupancyData: Occupancy) =>
          this.setTimezoneOffsets(occupancyData.occupancyStats)
        ),
        tap((occupancyData: Occupancy) =>
          occupancyData.occupancyStats.filter((element) => element.day !== 0)
        ),
        tap((occupancyData: Occupancy) => {
          occupancyData.occupancyStats.sort(
            (a, b) =>
              new Date(a.year, a.month, a.day, a.hour).valueOf() -
              new Date(b.year, b.month, b.day, b.hour).valueOf()
          );
        }),
        catchError((error) => {
          return this.handleError(error);
        }),
        share()
      );
  }

  private setTimezoneOffsets(occupancyData: OccupancyStat[]): OccupancyStat[] {
    occupancyData.forEach((occupancy, index) => {
      occupancy.hour += environment.timeZoneOffsetUTC;
      if (occupancy.hour < 0) {
        occupancy.hour += 24;
        occupancy.day -= 1;
        if (occupancy.day === 0) {
          // Get previous month
          occupancy.month = moment(
            new Date(occupancy.year, occupancy.month, occupancy.day)
          ).month();
          occupancy.day = moment(
            new Date(occupancy.year, occupancy.month, occupancy.day)
          )
            .endOf('month')
            .date();
        }
      }
    });
    return occupancyData;
  }

  updatePolygon(id: number, polygon?: number[][]): Observable<void> {
    let data = '""';
    if (polygon) {
      data = `"${JSON.stringify(polygon[0])}"`;
    }
    return this.http
      .put(`${this.apiUrl}/${id}/PolygonJson`, data, { headers: this.headers })
      .pipe(
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
