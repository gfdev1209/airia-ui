import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Device } from '@map/models';
import { of } from 'rxjs';
import * as DeviceActions from './device.actions';
import * as DeviceSelectors from './device.selectors';
import { DeviceService } from '@map/services/device.service';
import { RootState } from '..';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class DeviceEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private deviceService: DeviceService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.getAll),
      mergeMap(() =>
        this.deviceService.getAll<Device[]>().pipe(
          map((devices: Device[]) => DeviceActions.getAllSuccess({ devices })),
          catchError(() => of(DeviceActions.getAllFailed()))
        )
      )
    )
  );

  getByBuildingId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.getByBuildingId),
      mergeMap(({ buildingId }) =>
        this.deviceService.getAll<Device[]>().pipe(
          map((devices: Device[]) =>
            DeviceActions.getByBuildingIdSuccess({ devices })
          ),
          catchError(() => of(DeviceActions.getByBuildingIdFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.select),
      withLatestFrom(this.store.select(DeviceSelectors.selectEntities)),
      switchMap(([{ id }, devices]) => {
        const device = devices[id];
        if (device) {
          return of(
            DeviceActions.selectSuccess({
              device,
            })
          );
        } else {
          return of(DeviceActions.selectFailed());
        }
      }),
      catchError(() => of(DeviceActions.selectFailed()))
    )
  );
}
