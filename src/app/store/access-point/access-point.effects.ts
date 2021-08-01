import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  delay,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AccessPoint } from '@map/models';
import { of } from 'rxjs';
import * as AccessPointActions from './access-point.actions';
import * as AccessPointSelectors from './access-point.selectors';
import { AccessPointService } from '@map/services/access-point.service';
import { Store } from '@ngrx/store';
import { RootState } from '..';

@Injectable({
  providedIn: 'root',
})
export class AccessPointEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private accessPointService: AccessPointService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccessPointActions.getAll),
      mergeMap(() =>
        this.accessPointService
          .getAll<AccessPoint[]>('+Building+BuildingFloor')
          .pipe(
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

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccessPointActions.get),
      mergeMap(({ id }) =>
        this.accessPointService.get<AccessPoint>(id).pipe(
          map((accessPoint: AccessPoint) =>
            AccessPointActions.getSuccess({ accessPoint })
          ),
          catchError(() => of(AccessPointActions.getFailed()))
        )
      )
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccessPointActions.search),
      withLatestFrom(this.store.select(AccessPointSelectors.selectAll)),
      switchMap(([{ term }, accessPoints]) => {
        const searchResults = accessPoints.filter((entity) =>
          entity.name.toLowerCase().includes(term.toLowerCase())
        );
        return of(
          AccessPointActions.searchSuccess({
            searchResults,
          })
        );
      }),
      catchError(() => of(AccessPointActions.searchFailed()))
    )
  );
}
