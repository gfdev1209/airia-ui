import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { User } from '@map/models';
import { of } from 'rxjs';
import * as UserActions from './user.actions';
import * as UserSelectors from './user.selectors';
import { UserService } from '@map/services/user.service';
import { RootState } from '..';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private userService: UserService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getAll),
      mergeMap(() =>
        this.userService.getAll<User[]>().pipe(
          map((users: User[]) => UserActions.getAllSuccess({ users })),
          catchError(() => of(UserActions.getAllFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.select),
      withLatestFrom(this.store.select(UserSelectors.selectEntities)),
      switchMap(([{ id }, users]) => {
        const user = users[id];
        if (user) {
          return of(
            UserActions.selectSuccess({
              user,
            })
          );
        } else {
          return of(UserActions.selectFailed());
        }
      }),
      catchError(() => of(UserActions.selectFailed()))
    )
  );
}
