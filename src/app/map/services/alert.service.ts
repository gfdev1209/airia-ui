import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Alert } from '@map/models';
import { Observable } from 'rxjs';
import { retry, map, catchError, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlertService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Alerts', httpClient);
  }

  acknowledgeAlert(alert: Alert): Observable<void> {
    return this.http.put(`${this.apiUrl}/${alert.id}/Acknowledge`, null).pipe(
      retry(2),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }

  getFromMinutes(fromMin: number): Observable<Alert[]> {
    return this.http.get(`${this.apiUrl}/From/${fromMin}/to/0`).pipe(
      retry(2),
      map((response: any) => this.mapArrayResponseToObject(response)),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }

  getFromDate(from: Date): Observable<Alert[]> {
    return this.http.get(`${this.apiUrl}//From/${from.toJSON()}`).pipe(
      retry(2),
      map((response: any) => this.mapArrayResponseToObject(response)),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }

  getFromDateToDate(from: Date, to: Date): Observable<Alert[]> {
    return this.http
      .get(`${this.apiUrl}//From/${from.toJSON()}/To/${to.toJSON()}`)
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
    return new Alert(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Alert(responseJson));
  }
}
