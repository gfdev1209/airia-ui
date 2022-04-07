import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Location } from '@map/models';
import { of } from 'rxjs';
import * as LocationActions from './location.actions';
import * as LocationSelectors from './location.selectors';
import { LocationService } from '@map/services/location.service';
import { RootState } from '..';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class LocationEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private locationService: LocationService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.getAll),
      mergeMap(() =>
        this.locationService.getAll<Location[]>().pipe(
          map((locations: Location[]) =>
            LocationActions.getAllSuccess({ locations })
          ),
          catchError(() => of(LocationActions.getAllFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.select),
      withLatestFrom(this.store.select(LocationSelectors.selectEntities)),
      switchMap(([{ id }, locations]) => {
        const location = locations[id];
        if (location) {
          return of(
            LocationActions.selectSuccess({
              location,
            })
          );
        } else {
          return of(LocationActions.selectFailed());
        }
      }),
      catchError(() => of(LocationActions.selectFailed()))
    )
  );
}
