import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Building } from 'src/app/map/models';
import { of } from 'rxjs';
import * as BuildingActions from './building.actions';
import { BuildingService } from 'src/app/map/services/building.service';

@Injectable({
  providedIn: 'root',
})
export class BuildingEffects {
  constructor(
    private actions$: Actions,
    private buildingService: BuildingService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.getAll),
      mergeMap(() =>
        this.buildingService.getAll().pipe(
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
      mergeMap(({ term }) =>
        this.buildingService.search(term).pipe(
          map((buildings: Building[]) =>
            BuildingActions.searchSuccess({ buildings })
          ),
          catchError(() => of(BuildingActions.searchFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.select),
      mergeMap(({ id }) =>
        this.buildingService.get(id).pipe(
          map((building: Building) =>
            BuildingActions.selectSuccess({ building })
          ),
          catchError(() => of(BuildingActions.selectFailed()))
        )
      )
    )
  );
}
