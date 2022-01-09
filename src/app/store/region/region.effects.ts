import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Occupancy, Region } from '@map/models';
import { of } from 'rxjs';
import * as RegionActions from './region.actions';
import * as RegionSelectors from './region.selectors';
import { RegionService } from '@map/services/region.service';
import { RootState } from '..';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class RegionEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private regionService: RegionService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionActions.getAll),
      mergeMap(() =>
        this.regionService.getAll<Region[]>().pipe(
          map((regions: Region[]) => RegionActions.getAllSuccess({ regions })),
          catchError(() => of(RegionActions.getAllFailed()))
        )
      )
    )
  );

  getBuildingRegions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionActions.getBuildingRegions),
      mergeMap(() =>
        this.regionService.getAll<Region[]>('?buildingsOnly=true').pipe(
          map((regions: Region[]) =>
            RegionActions.getBuildingRegionsSuccess({ regions })
          ),
          catchError(() => of(RegionActions.getBuildingRegionsFailed()))
        )
      )
    )
  );

  getOccupancy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionActions.getOccupancy),
      mergeMap(({ id, year, month, day }) =>
        this.regionService.getOccupancy(id, year, month, day).pipe(
          map((occupancy: Occupancy[]) =>
            RegionActions.getOccupancySuccess({ occupancy })
          ),
          catchError(() => of(RegionActions.getOccupancyFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionActions.select),
      withLatestFrom(this.store.select(RegionSelectors.selectAll)),
      switchMap(([{ id }, regions]) => {
        const region = regions.filter((x: Region) => x.id === id)[0];
        if (region) {
          return of(
            RegionActions.selectSuccess({
              region,
            })
          );
        } else {
          return of(RegionActions.selectFailed());
        }
      }),
      catchError(() => of(RegionActions.selectFailed()))
    )
  );
}
