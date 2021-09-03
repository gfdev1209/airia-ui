import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Floor } from '@map/models';
import { concat, of } from 'rxjs';
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
      ofType(FloorActions.select, FloorActions.selectFromTable),
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

  selectFloorNumber$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FloorActions.selectFloorNumber),
      switchMap(({ floorNumber }) => {
        return of(
          FloorActions.selectFloorNumberSuccess({
            floorNumber,
          })
        );
      }),
      catchError(() => of(FloorActions.selectFloorNumberFailed()))
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FloorActions.add),
      mergeMap(({ addFloorInput }) =>
        this.floorService.create<Floor>(addFloorInput).pipe(
          mergeMap((floor: Floor) =>
            concat(
              of(FloorActions.addSuccess({ floor })),
              of(FloorActions.closeFormModal())
            )
          ),
          catchError(() =>
            of(FloorActions.addFailed(), FloorActions.closeFormModal())
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FloorActions.update),
      mergeMap(({ floor }) =>
        this.floorService.update<Floor>(floor.id, floor.changes).pipe(
          mergeMap(() =>
            concat(
              of(FloorActions.updateSuccess({ floor })),
              of(FloorActions.closeFormModal())
            )
          ),
          catchError(() =>
            of(FloorActions.updateFailed(), FloorActions.closeFormModal())
          )
        )
      )
    )
  );
}
