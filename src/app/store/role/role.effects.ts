import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { UserRole } from '@map/models';
import { of } from 'rxjs';
import * as RoleActions from './role.actions';
import * as RoleSelectors from './role.selectors';
import { RoleService } from '@map/services/role.service';
import { RootState } from '..';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class RoleEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private roleService: RoleService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.getAll),
      mergeMap(() =>
        this.roleService.getAll<UserRole[]>().pipe(
          map((roles: UserRole[]) => RoleActions.getAllSuccess({ roles })),
          catchError(() => of(RoleActions.getAllFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.select),
      withLatestFrom(this.store.select(RoleSelectors.selectEntities)),
      switchMap(([{ id }, roles]) => {
        const role = roles[id];
        if (role) {
          return of(
            RoleActions.selectSuccess({
              role,
            })
          );
        } else {
          return of(RoleActions.selectFailed());
        }
      }),
      catchError(() => of(RoleActions.selectFailed()))
    )
  );
}
