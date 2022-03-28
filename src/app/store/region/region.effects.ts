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
import { Region, Occupancy, Building } from '@map/models';
import { of } from 'rxjs';
import * as RegionActions from './region.actions';
import * as RegionSelectors from './region.selectors';
import { RegionService } from '@map/services/region.service';
import { RootState } from '..';
import { Store } from '@ngrx/store';
import { BuildingService } from '@map/services/building.service';
import { MapService } from '@map/services/map.service';

@Injectable({
  providedIn: 'root',
})
export class RegionEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private regionService: RegionService,
    private buildingService: BuildingService,
    private mapService: MapService
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
        const region = regions[id];
        if (region) {
          return of(
            RegionActions.selectSuccess({
              region,
            })
          );
        } else {
          return this.regionService
            .get<Region>(id, '+BuildingFloor')
            .pipe(
              map((region2) => RegionActions.selectSuccess({ region: region2 }))
            );
        }
      }),
      catchError(() => of(RegionActions.selectFailed()))
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionActions.update),
      mergeMap(({ region }) =>
        this.regionService.update<Region>(region.id, region.changes).pipe(
          map((updatedRegion: Region) =>
            RegionActions.updateSuccess({ region })
          ),
          catchError((error) => of(RegionActions.updateFailed()))
        )
      )
    )
  );

  editShape$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegionActions.editRegionShape),
        tap(() => this.mapService.setDrawing(true))
      ),
    { dispatch: false }
  );

  updatePolygon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RegionActions.updateRegionPolygon,
        RegionActions.updateRegionPolygonMap
      ),
      withLatestFrom(this.store.select(RegionSelectors.selectEntities)),
      switchMap(([{ id, polygon }, regions]) => {
        const region = regions[id];
        if (!region) {
          throw new Error(`Unable to find region with ID of ${id}`);
        }
        return of({ region, polygon });
      }),
      mergeMap(({ region, polygon }) => {
        return this.regionService.updatePolygon(region.id, polygon).pipe(
          map(() => {
            region.regionPolygon = polygon;
            return RegionActions.updateRegionPolygonSuccess({
              region,
            });
          })
        );
      }),
      catchError(() => of(RegionActions.selectFailed()))
    )
  );
}
