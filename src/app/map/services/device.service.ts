import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Device } from '@map/models';
import { Observable } from 'rxjs';
import { retry, map, catchError, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Devices', httpClient);
  }

  getSeenFromMinutes(fromMin: number): Observable<Device[]> {
    return this.http.get(`${this.apiUrl}/Seen/From/${fromMin}`).pipe(
      retry(2),
      map((response: any) => this.mapArrayResponseToObject(response)),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }

  getSeenFromDate(from: Date): Observable<Device[]> {
    return this.http.get(`${this.apiUrl}/Seen/From/${from.toJSON()}`).pipe(
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
      .get(`${this.apiUrl}/Seen/From/${from.toJSON()}/To/${to.toJSON()}`)
      .pipe(
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
