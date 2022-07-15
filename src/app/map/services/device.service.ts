import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Device } from '@map/models';
import { Observable, of } from 'rxjs';
import {
  retry, map, catchError, share, debounceTime, concatMap
} from 'rxjs/operators';
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
        concatMap((response: any) => this.getSelfThenNext(response, [])),
        catchError((error) => {
          return this.handleError(error);
        }),
        share()
      );
  }

  getSelfThenNext(response: any, devices: Device[]): Observable<Device[]> {
    if (response._embedded === null ||
        response._links === null) {
      throw new Error('Invalid parameter to getSelfThenNext');
    }

    let nextDevices = devices.concat(response._embedded
      .records
      .map((responseJson: any) => new Device(responseJson))
    );

    if (response._links.next) {
      return this.http.get(response._links.next).pipe(
        concatMap(x => this.getSelfThenNext(x, nextDevices))
      );
    } else {
      return of(nextDevices);
    }
  }

  mapResponseToObject<T>(response: any): T {
    return new Device(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Device(responseJson));
  }
}
