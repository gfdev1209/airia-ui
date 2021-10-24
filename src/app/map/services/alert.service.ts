import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Alert } from '@map/models';
import { Observable } from 'rxjs';
import { retry, map, catchError, share } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { SkipTakeInput } from '@shared/models/skip-take-input.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Alerts', httpClient);
  }

  createSkipTakeInput(event: LazyLoadEvent, rows: number): SkipTakeInput {
    const skipTakeInput = new SkipTakeInput(0, rows);
    skipTakeInput.parameters = { sortOrder: -1 };
    // if (event.rows) {
    //   rows = event.rows;
    //   skipTakeInput.take = event.rows;
    // }
    skipTakeInput.take = rows;
    if (event.first) {
      skipTakeInput.skip = event.first;
    }
    if (event.sortOrder) {
      skipTakeInput.parameters.sortOrder = event.sortOrder;
    }
    if (event.sortField) {
      skipTakeInput.parameters.sortField = event.sortField;
    }
    return skipTakeInput;
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

  getFromMinutes(
    fromMin: number,
    appendToUrl: string = ''
  ): Observable<Alert[]> {
    return this.http
      .get(`${this.apiUrl}/From/${fromMin}/to/0${appendToUrl}`)
      .pipe(
        retry(2),
        map((response: any) => this.mapArrayResponseToObject(response)),
        catchError((error) => {
          return this.handleError(error);
        }),
        share()
      );
  }

  getFromDate(from: Date, appendToUrl: string = ''): Observable<Alert[]> {
    return this.http
      .get(`${this.apiUrl}/From/${from.toJSON()}${appendToUrl}`)
      .pipe(
        retry(2),
        map((response: any) => this.mapArrayResponseToObject(response)),
        catchError((error) => {
          return this.handleError(error);
        }),
        share()
      );
  }

  getFromDateToDate(
    from: Date,
    to: Date,
    appendToUrl: string = ''
  ): Observable<Alert[]> {
    return this.http
      .get(
        `${this.apiUrl}/From/${from.toJSON()}/To/${to.toJSON()}${appendToUrl}`
      )
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
