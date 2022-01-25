import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, retry, share } from 'rxjs/operators';
import { Building, BuildingAnalytics } from '@map/models';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import Helpers from '@core/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class BuildingService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Buildings', httpClient);
  }
  getAnalytics(
    buildingId: number,
    startDate?: Date,
    endDate?: Date
  ): Observable<BuildingAnalytics> {
    let queryParams = '';
    if (startDate && endDate) {
      queryParams += `?startInstant=${Helpers.formatDateToJSON(
        startDate
      )}&endInstant=${Helpers.formatDateToJSON(endDate)}`;
    }
    return this.http
      .get(`${this.apiUrl}/${buildingId}/Analytics${queryParams}`)
      .pipe(
        map((response: any) => new BuildingAnalytics(response)),
        catchError((error) => {
          return this.handleError(error);
        }),
        share()
      );
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
    const building = new Building(response) as any;
    return building;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Building(responseJson));
  }
}
