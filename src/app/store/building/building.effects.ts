import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Building } from '@map/models';
import { of } from 'rxjs';
import * as BuildingActions from './building.actions';
import * as BuildingSelectors from './building.selectors';
import { BuildingService } from '@map/services/building.service';
import { RootState } from '..';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class BuildingEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private buildingService: BuildingService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.getAll),
      mergeMap(() =>
        this.buildingService.getAll<Building[]>().pipe(
          map((buildings: Building[]) =>
            BuildingActions.getAllSuccess({ buildings })
          ),
          catchError(() => of(BuildingActions.getAllFailed()))
        )
      )
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.search),
      withLatestFrom(this.store.select(BuildingSelectors.selectAll)),
      switchMap(([{ term }, buildings]) => {
        const searchResults = buildings.filter((entity) =>
          entity.buildingName.toLowerCase().includes(term.toLowerCase())
        );
        return of(
          BuildingActions.searchSuccess({
            searchResults,
          })
        );
      }),
      catchError(() => of(BuildingActions.searchFailed()))
    )
  );

  // select2$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(BuildingActions.select),
  //     mergeMap(({ id }) =>
  //       this.buildingService
  //         .get<Building>(id, '+Department+Role')
  //         .pipe(map((building) => BuildingActions.selectSuccess({ building })))
  //     ),
  //     catchError(() => of(BuildingActions.selectFailed()))
  //   )
  // );
  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.select),
      withLatestFrom(this.store.select(BuildingSelectors.selectEntities)),
      switchMap(([{ id }, buildings]) => {
        const building = buildings[id];
        if (building) {
          return of(
            BuildingActions.selectSuccess({
              building,
            })
          );
        } else {
          return this.buildingService
            .get<Building>(id)
            .pipe(
              map((building2) =>
                BuildingActions.selectSuccess({ building: building2 })
              )
            );
        }
      }),
      catchError(() => of(BuildingActions.selectFailed()))
    )
  );

  selectByMapboxId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.selectByMapboxId),
      withLatestFrom(this.store.select(BuildingSelectors.selectAll)),
      switchMap(([{ mapboxId }, buildings]) => {
        const building = buildings.find(
          (entity) => entity.mapboxId === mapboxId
        );
        if (building) {
          return of(
            BuildingActions.selectByMapboxIdSuccess({
              building,
            })
          );
        } else {
          return of(BuildingActions.selectByMapboxIdNotFound());
        }
      }),
      catchError(() => of(BuildingActions.selectByMapboxIdFailed()))
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.update),
      mergeMap(({ building }) =>
        this.buildingService
          .update<Building>(building.id, building.changes)
          .pipe(
            map((updatedBuilding: Building) =>
              BuildingActions.updateSuccess({ building })
            ),
            catchError((error) => of(BuildingActions.updateFailed()))
          )
      )
    )
  );
}
