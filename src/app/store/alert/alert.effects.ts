import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Alert } from '@map/models';
import { of } from 'rxjs';
import * as AlertActions from './alert.actions';
import { AlertService } from '@map/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AlertEffects {
  constructor(private actions$: Actions, private alertService: AlertService) {}

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

  getFromMinutes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertActions.getFromMinutes),
      mergeMap(({ fromMin }) =>
        this.alertService.getFromMinutes(fromMin).pipe(
          map((alerts: Alert[]) =>
            AlertActions.getFromMinutesSuccess({ alerts })
          ),
          catchError(() => of(AlertActions.getFromMinutesFailed()))
        )
      )
    )
  );

  getFromDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertActions.getFromDate),
      mergeMap(({ date }) =>
        this.alertService.getFromDate(date).pipe(
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
        this.alertService.getFromDateToDate(from, to).pipe(
          map((alerts: Alert[]) =>
            AlertActions.getFromDateToDateSuccess({ alerts })
          ),
          catchError(() => of(AlertActions.getFromDateToDateFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertActions.select),
      mergeMap(({ id }) =>
        this.alertService.get<Alert>(id).pipe(
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
              .get<Alert>(alert.id)
              .pipe(
                map((updatedAlert: Alert) =>
                  AlertActions.acknowledgeAlertSuccess({ alert: updatedAlert })
                )
              )
          ),
          catchError(() => of(AlertActions.selectFailed()))
        )
      )
    )
  );
}
