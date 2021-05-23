import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
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
        this.alertService.getAll().pipe(
          map((alerts: Alert[]) => AlertActions.getAllSuccess({ alerts })),
          catchError(() => of(AlertActions.getAllFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertActions.select),
      mergeMap(({ id }) =>
        this.alertService.get(id).pipe(
          map((alert: Alert) => AlertActions.selectSuccess({ alert })),
          catchError(() => of(AlertActions.selectFailed()))
        )
      )
    )
  );
}
