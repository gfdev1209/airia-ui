import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AccessPoint } from '@map/models';
import { of } from 'rxjs';
import * as AccessPointActions from './access-point.actions';
import { AccessPointService } from '@map/services/access-point.service';

@Injectable({
  providedIn: 'root',
})
export class AccessPointEffects {
  constructor(
    private actions$: Actions,
    private accessPointService: AccessPointService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccessPointActions.getAll),
      mergeMap(() =>
        this.accessPointService.getAll<AccessPoint[]>().pipe(
          map((accessPoints: AccessPoint[]) => {
            accessPoints.forEach((accessPoint) => {
              accessPoint.createdAt = new Date(accessPoint.createdAt);
            });
            return accessPoints;
          }),
          map((accessPoints: AccessPoint[]) =>
            AccessPointActions.getAllSuccess({ accessPoints })
          ),
          catchError(() => of(AccessPointActions.getAllFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccessPointActions.select),
      mergeMap(({ id }) =>
        this.accessPointService.get<AccessPoint>(id).pipe(
          map((accessPoint: AccessPoint) =>
            AccessPointActions.selectSuccess({ accessPoint })
          ),
          catchError(() => of(AccessPointActions.selectFailed()))
        )
      )
    )
  );
}
