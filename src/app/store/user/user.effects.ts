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
import { User, UserRole } from '@map/models';
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
        this.userService.getAll<User[]>('+Department+Role').pipe(
          map((users: User[]) => UserActions.getAllSuccess({ users })),
          catchError(() => of(UserActions.getAllFailed()))
        )
      )
    )
  );

  getSelf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getSelf),
      mergeMap(() =>
        this.userService.getSelf('+Department+Role').pipe(
          map((user: User) => UserActions.getSelfSuccess({ user })),
          catchError(() => of(UserActions.getSelfFailed()))
        )
      )
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.search),
      withLatestFrom(this.store.select(UserSelectors.selectAll)),
      switchMap(([{ term }, users]) => {
        const searchResults = users.filter((entity) =>
          entity.fullName.toLowerCase().includes(term.toLowerCase())
        );
        return of(
          UserActions.searchSuccess({
            searchResults,
          })
        );
      }),
      catchError(() => of(UserActions.searchFailed()))
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.select),
      mergeMap(({ id }) =>
        this.userService
          .get<User>(id, '+Department+Role')
          .pipe(map((user) => UserActions.selectSuccess({ user })))
      ),
      catchError(() => of(UserActions.selectFailed()))
    )
  );

  updateUserRole$ = createEffect(() =>
  this.actions$.pipe(
      ofType(UserActions.updateRole),
      mergeMap(({ role }) =>
          this.userService.update<UserRole>(`${role?.userId}/Role/${role?.name}`,{}).pipe(
              map((updatedUser: UserRole) => UserActions.updateRoleSuccess({ role })),
              catchError((error) => of(UserActions.updateRoleFailed()))
          )
      )
  )
);

updateUser$ = createEffect(() =>
this.actions$.pipe(
    ofType(UserActions.update),
    mergeMap(({ user }) =>
        this.userService.update<User>(`${user?.id}`,user).pipe(
            tap(res=>console.log("user udpated",res)),
            map((updatedUser: User) => UserActions.updateSuccess({ user:updatedUser})),
            catchError((error) => of(UserActions.updateFailed()))
        )
    )
));
}
