import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Device } from '@map/models';
import { Observable } from 'rxjs';
import { retry, map, catchError, share, debounceTime } from 'rxjs/operators';
import * as moment from 'moment-timezone';
import Helpers from '@core/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class DeviceService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('DevicesRationalized', httpClient);
  }

  getSeenFromMinutes(fromMin: number): Observable<Device[]> {
    return this.http.get(`${this.apiUrl}/Seen/From/${fromMin}`).pipe(
      debounceTime(1000),
      retry(2),
      map((response: any) => this.mapArrayResponseToObject(response)),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }

  getSeenFromDate(from: Date): Observable<Device[]> {
    const dateFormatted = Helpers.formatDateToJSON(from);
    return this.http.get(`${this.apiUrl}/Seen/From/${dateFormatted}`).pipe(
      debounceTime(1000),
      retry(2),
      map((response: any) => this.mapArrayResponseToObject(response)),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }

  getSeenFromDateToDate(from: Date, to: Date): Observable<Device[]> {
    return this.http
      .get(
        `${this.apiUrl}/Seen/From/${Helpers.formatDateToJSON(
          from
        )}/To/${Helpers.formatDateToJSON(to)}`
      )
      .pipe(
        debounceTime(1000),
        retry(2),
        map((response: any) => this.mapArrayResponseToObject(response)),
        catchError((error) => {
          return this.handleError(error);
        }),
        share()
      );
  }

  mapResponseToObject<T>(response: any): T {
    return new Device(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Device(responseJson));
  }
}
