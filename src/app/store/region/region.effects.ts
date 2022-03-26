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
import { Building, Occupancy, Region } from '@map/models';
import { of } from 'rxjs';
import * as RegionActions from './region.actions';
import * as RegionSelectors from './region.selectors';
import { RegionService } from '@map/services/region.service';
import { RootState } from '..';
import { Store } from '@ngrx/store';
import { BuildingService } from '@map/services/building.service';

@Injectable({
  providedIn: 'root',
})
export class RegionEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private regionService: RegionService,
    private buildingService: BuildingService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionActions.getAll),
      switchMap(() => this.buildingService.getAll<Building[]>()),
      switchMap((buildings) => {
        return this.regionService.getAll<Region[]>('+BuildingFloor').pipe(
          tap((regions) => {
            const buildingDict = Object.assign(
              {},
              ...buildings.map((building) => ({ [building.id]: building }))
            );
            regions.forEach((region) => {
              region.buildingName = region.buildingFloor?.buildingId
                ? buildingDict[region.buildingFloor?.buildingId].buildingName
                : 'n/a';
            });
          }),
          map((regions: Region[]) => RegionActions.getAllSuccess({ regions })),
          catchError(() => of(RegionActions.getAllFailed()))
        );
      })
    )
  );
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionActions.search),
      withLatestFrom(this.store.select(RegionSelectors.selectActiveRegions)),
      switchMap(([{ term }, regions]) => {
        const searchResults = regions.filter((entity) =>
          entity.name.toLowerCase().includes(term.toLowerCase())
        );
        return of(
          RegionActions.searchSuccess({
            searchResults,
          })
        );
      }),
      catchError(() => of(RegionActions.searchFailed()))
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
          map((occupancy: Occupancy) =>
            RegionActions.getOccupancySuccess({ occupancy })
          ),
          catchError(() => of(RegionActions.getOccupancyFailed()))
        )
      )
    )
  );

  getOccupancyRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionActions.getOccupancyRange),
      mergeMap(({ id, from, to }) =>
        this.regionService.getOccupancyRange(id, from, to).pipe(
          map((occupancy: Occupancy) =>
            RegionActions.getOccupancyRangeSuccess({ occupancy })
          ),
          catchError(() => of(RegionActions.getOccupancyRangeFailed()))
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
