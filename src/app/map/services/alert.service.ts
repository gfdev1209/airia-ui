import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Alert } from '@map/models';
import { Observable } from 'rxjs';
import { retry, map, catchError, share } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { SkipTakeInput } from '@shared/models/skip-take-input.model';
import Helpers from '@core/utils/helpers';
import { OccupancyAlertGraph } from '@map/models/occupancy-alert-graph.model';

@Injectable({
    providedIn: 'root',
})
export class AlertService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super('Alerts', httpClient);
    }

    getAlertGraphFromUrl(visualizationJsonUrl: string): Observable<OccupancyAlertGraph> {
        return this.httpClient.get(visualizationJsonUrl).pipe(map((response: any) => new OccupancyAlertGraph(response)));
    }

    createSkipTakeInput(event: LazyLoadEvent, rows: number, buildingId?: number): SkipTakeInput {
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
            if (event.filters.alertEndTime?.value && event.filters.alertEndTime.matchMode) {
                skipTakeInput.filters.alertEndTime = {};
                skipTakeInput.filters.alertEndTime.value = new Date(event.filters.alertEndTime.value).toISOString();
                skipTakeInput.filters.alertEndTime.matchMode = event.filters.alertEndTime.matchMode;
            }
            if (event.filters.alertMessage?.value) {
                skipTakeInput.filters.alertMessage = {};
                skipTakeInput.filters.alertMessage.value = event.filters.alertMessage.value;
                skipTakeInput.filters.alertMessage.matchMode = event.filters.alertMessage.matchMode;
            }
            if (event.filters.alertType?.value) {
                skipTakeInput.filters.alertType = {};
                skipTakeInput.filters.alertType.value = event.filters.alertType.value;
                skipTakeInput.filters.alertType.matchMode = event.filters.alertType.matchMode;
            }
            if (event.filters.alertSeverity?.value && event.filters.alertSeverity.value.length > 0) {
                skipTakeInput.filters.alertSeverity = {};
                skipTakeInput.filters.alertSeverity.value = event.filters.alertSeverity.value;
                skipTakeInput.filters.alertSeverity.matchMode = event.filters.alertSeverity.matchMode;
            }
            if (buildingId) {
                skipTakeInput.filters.buildingId = {};
                skipTakeInput.filters.buildingId.value = buildingId;
                skipTakeInput.filters.buildingId.matchMode = 'is';
            }
        }
        return skipTakeInput;
    }

    skipAndTake<T>(skipTakeInput: SkipTakeInput, appendToUrl: string = '', params: string = ''): Observable<T> {
        params = new URLSearchParams(skipTakeInput.parameters).toString();
        if (skipTakeInput.filters?.alertMessage) {
            params += this.createFilterQueryString(skipTakeInput, 'alertMessage', 'AlertMessage');
        }
        if (skipTakeInput.filters?.noise) {
            params += this.createFilterQueryString(skipTakeInput, 'noise', 'Noise', 'LT');
        }
        if (skipTakeInput.filters?.alertEndTime) {
            params += this.createFilterQueryString(skipTakeInput, 'alertEndTime', 'AlertStartTime', 'dateIs');
        }
        if (skipTakeInput.filters?.alertType) {
            params += this.createFilterQueryString(skipTakeInput, 'alertType', 'AlertType', 'in');
        }
        if (skipTakeInput.filters?.alertSeverity) {
            params += this.createFilterQueryString(skipTakeInput, 'alertSeverity', 'AlertSeverity');
        }
        if (skipTakeInput.filters?.buildingId) {
            params += this.createFilterQueryString(skipTakeInput, 'buildingId', 'BuildingId', 'is');
        }
        return super.skipAndTake<T>(skipTakeInput, appendToUrl, params);
    }

    createFilterQueryString(skipTakeInput: SkipTakeInput, parameterName: string, queryName: string, matchModeOverride?: string): string {
        let queryString = '';
        let matchMode = matchModeOverride;
        if (Array.isArray(skipTakeInput.filters[parameterName].value) && skipTakeInput.filters[parameterName].value.toString().length > 0) {
            skipTakeInput.filters[parameterName].value.forEach((parameter: any) => {
                if (parameter) {
                    queryString += `&${queryName}.Values=${parameter}`;
                }
            });
            matchMode = matchModeOverride ? matchModeOverride : skipTakeInput.filters[parameterName].matchMode;
            queryString += `&${queryName}.MatchMode=${matchMode}`;
        } else if (skipTakeInput.filters[parameterName].value.toString().length > 0) {
            if (parameterName === 'noise') {
                queryString += `&${queryName}.DoubleValue=${skipTakeInput.filters[parameterName].value}`;
            } else {
                queryString += `&${queryName}.Value=${skipTakeInput.filters[parameterName].value}`;
            }
            matchMode = matchModeOverride ? matchModeOverride : 'is';
            queryString += `&${queryName}.MatchMode=${matchMode}`;
        }
        return queryString;
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

    getFromMinutes(fromMin: number, appendToUrl: string = ''): Observable<Alert[]> {
        return this.http.get(`${this.apiUrl}/From/${fromMin}/to/0${appendToUrl}`).pipe(
            retry(2),
            map((response: any) => this.mapArrayResponseToObject(response)),
            catchError((error) => {
                return this.handleError(error);
            }),
            share()
        );
    }

    getFromDate(from: Date, appendToUrl: string = ''): Observable<Alert[]> {
        return this.http.get(`${this.apiUrl}/From/${Helpers.formatDateToJSON(from)}${appendToUrl}`).pipe(
            retry(2),
            map((response: any) => this.mapArrayResponseToObject(response)),
            catchError((error) => {
                return this.handleError(error);
            }),
            share()
        );
    }

    getFromDateToDate(from: Date, to: Date, appendToUrl: string = ''): Observable<Alert[]> {
        return this.http.get(`${this.apiUrl}/From/${Helpers.formatDateToJSON(from)}/To/${Helpers.formatDateToJSON(to)}${appendToUrl}`).pipe(
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
