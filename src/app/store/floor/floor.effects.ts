import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Floor } from '@map/models';
import { of } from 'rxjs';
import * as FloorActions from './floor.actions';
import * as FloorSelectors from './floor.selectors';
import { FloorService } from '@map/services/floor.service';
import { RootState } from '..';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class FloorEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private floorService: FloorService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FloorActions.getAll),
      mergeMap(() =>
        this.floorService.getAll<Floor[]>().pipe(
          map((floors: Floor[]) => FloorActions.getAllSuccess({ floors })),
          catchError(() => of(FloorActions.getAllFailed()))
        )
      )
    )
  );

  getByBuildingId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FloorActions.getByBuildingId),
      mergeMap(({ buildingId }) =>
        this.floorService.getAll<Floor[]>().pipe(
          map((floors: Floor[]) =>
            FloorActions.getByBuildingIdSuccess({ floors })
          ),
          catchError(() => of(FloorActions.getByBuildingIdFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FloorActions.select),
      withLatestFrom(this.store.select(FloorSelectors.selectEntities)),
      switchMap(([{ id }, floors]) => {
        const floor = floors[id];
        if (floor) {
          return of(
            FloorActions.selectSuccess({
              floor,
            })
          );
        } else {
          return of(FloorActions.selectFailed());
        }
      }),
      catchError(() => of(FloorActions.selectFailed()))
    )
  );
}