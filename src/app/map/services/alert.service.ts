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
    skipTakeInput.filters = {};
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
    if (event.filters) {
      if (event.filters.createdAt?.value && event.filters.createdAt.matchMode) {
        skipTakeInput.filters.createdAt = {};
        skipTakeInput.filters.createdAt.value = '2021-10-22 00:00:00';
        skipTakeInput.filters.createdAt.matchMode =
          event.filters.createdAt.matchMode;
      }
      if (event.filters.alertMessage?.value) {
        skipTakeInput.filters.alertMessage = {};
        skipTakeInput.filters.alertMessage.value =
          event.filters.alertMessage.value;
        skipTakeInput.filters.alertMessage.matchMode =
          event.filters.alertMessage.matchMode;
      }
      if (
        event.filters.alertSeverity?.value &&
        event.filters.alertSeverity.value.length > 0
      ) {
        skipTakeInput.filters.alertSeverity = {};
        skipTakeInput.filters.alertSeverity.value =
          event.filters.alertSeverity.value;
        skipTakeInput.filters.alertSeverity.matchMode =
          event.filters.alertSeverity.matchMode;
      }
    }
    //   'https://lakeway-api.dev.airia20.com/api/Alerts/Skip/0/Take/10?withPagination=true&AlertSeverity.Values=orange&AlertSeverity.Values=red&AlertSeverity.MatchMode=in' \

    return skipTakeInput;
  }

  skipAndTake<T>(
    skipTakeInput: SkipTakeInput,
    appendToUrl: string = '',
    params: string = ''
  ): Observable<T> {
    params = new URLSearchParams(skipTakeInput.parameters).toString();
    if (skipTakeInput.filters?.alertMessage) {
      params += `&AlertMessage.Value=${skipTakeInput.filters.alertMessage.value}&AlertMessage.MatchMode=${skipTakeInput.filters.alertMessage.matchMode}`;
    }
    if (skipTakeInput.filters?.createdAt) {
      params += `&FeatureEventtime.Value=${skipTakeInput.filters.createdAt.value}&FeatureEventtime.MatchMode=${skipTakeInput.filters.createdAt.matchMode}`;
    }
    if (skipTakeInput.filters?.alertSeverity) {
      skipTakeInput.filters.alertSeverity.value.forEach(
        (alertSeverity: any) => {
          if (alertSeverity) {
            params += `&AlertSeverity.Value=${alertSeverity}`;
          }
        }
      );
      // params += `&AlertSeverity.MatchMode=${skipTakeInput.filters.alertSeverity.matchMode}`;
    }
    return super.skipAndTake<T>(skipTakeInput, appendToUrl, params);
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
