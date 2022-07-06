import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Alert } from '@map/models';
import { of } from 'rxjs';
import * as AlertActions from './alert.actions';
import { AlertService } from '@map/services/alert.service';
import { OccupancyAlertGraph } from '@map/models/occupancy-alert-graph.model';
import { UserService } from '@map/services/user.service';

@Injectable({
    providedIn: 'root',
})
export class AlertEffects {
    constructor(private actions$: Actions, private alertService: AlertService, private userService:UserService) {}

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlertActions.getAll),
            mergeMap(() =>
                this.alertService.getAll<Alert[]>().pipe(
                    map((alerts: Alert[]) => {
                        alerts.forEach((alert) => {
                            alert.createdAt = new Date(alert.createdAt);
                        });
                        // alerts = alerts.slice(0, 50);
                        return alerts;
                    }),
                    map((alerts: Alert[]) => AlertActions.getAllSuccess({ alerts })),
                    catchError(() => of(AlertActions.getAllFailed()))
                )
            )
        )
    );

    skipAndTake$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlertActions.skipAndTakeAlertTable, AlertActions.skipAndTakeReportTable, AlertActions.skipAndTakeAlertPanel),
            mergeMap(({ skipTakeInput }) =>
                this.alertService.skipAndTake<Alert[]>(skipTakeInput, '/+AcknowledgedBy').pipe(
                    map((alerts: Alert[]) => AlertActions.skipAndTakeSuccess({ alerts })),
                    catchError(() => of(AlertActions.skipAndTakeFailed()))
                )
            )
        )
    );

    getFromMinutes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlertActions.getFromMinutes),
            mergeMap(({ fromMin }) =>
                this.alertService.getFromMinutes(fromMin, '/+AcknowledgedBy').pipe(
                    map((alerts: Alert[]) => AlertActions.getFromMinutesSuccess({ alerts })),
                    catchError(() => of(AlertActions.getFromMinutesFailed()))
                )
            )
        )
    );

    getFromDate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlertActions.getFromDate),
            mergeMap(({ date }) =>
                this.alertService.getFromDate(date, '/+AcknowledgedBy').pipe(
                    map((alerts: Alert[]) => AlertActions.getFromDateSuccess({ alerts })),
                    catchError(() => of(AlertActions.getFromDateFailed()))
                )
            )
        )
    );

    getFromTo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlertActions.getFromDateToDate),
            mergeMap(({ from, to }) =>
                this.alertService.getFromDateToDate(from, to, '/+AcknowledgedBy').pipe(
                    map((alerts: Alert[]) => AlertActions.getFromDateToDateSuccess({ alerts })),
                    catchError(() => of(AlertActions.getFromDateToDateFailed()))
                )
            )
        )
    );

    select$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlertActions.select),
            mergeMap(({ id }) =>
                this.alertService.get<Alert>(id, '+AccessPoint+AcknowledgedBy').pipe(
                    switchMap((alert: Alert) => {
                        if (alert.visualizationJsonUrl) {
                            return this.alertService.getAlertGraphFromUrl(alert.visualizationJsonUrl).pipe(
                                map((occupancyGraph) => {
                                    alert.alertGraph = occupancyGraph;
                                    return alert;
                                })
                            );
                        }
                        return of(alert);
                    }),
                    map((alert: Alert) => AlertActions.selectSuccess({ alert })),
                    catchError(() => of(AlertActions.selectFailed()))
                )
            )
        )
    );

    acknowledge$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlertActions.acknowledgeAlert),
            mergeMap(({ alert }) =>
                this.alertService.acknowledgeAlert(alert).pipe(
                    mergeMap(() =>
                        this.alertService
                            .get<Alert>(alert.id, '+AcknowledgedBy')
                            .pipe(map((updatedAlert: Alert) => AlertActions.acknowledgeAlertSuccess({ alert: updatedAlert })))
                    ),
                    catchError(() => of(AlertActions.selectFailed()))
                )
            )
        )
    );

    pinAlert$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlertActions.pinAlert),
            mergeMap(({ alert }) =>
                this.userService.pinAlert(alert).pipe(map((_) => AlertActions.selectSuccess({alert})))
                // .pipe(
                //     mergeMap(() =>
                //         this.userService
                //             .getUserPreference()
                //             .pipe(map((updatedAlert: Alert) => AlertActions.pinAlertSuccess({ alert: updatedAlert })))
                //     ),
                //     catchError(() => of(AlertActions.pinAlertFailed()))
                // )
            )
        )
    );

    getPinnedAlerts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlertActions.getPinnedAlerts),
            mergeMap(({ ids }) =>
                this.alertService.getPinnedAlertsByIds(ids).pipe(
                    map((alerts: Alert[]) => AlertActions.getPinnedAlertsSuccess({alerts})),
                    catchError(() => of(AlertActions.getPinnedAlertsFailed()))
                )
            )
        )
    );
}
