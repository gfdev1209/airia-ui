import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Department } from '@map/models';
import { of } from 'rxjs';
import * as DepartmentActions from './department.actions';
import * as DepartmentSelectors from './department.selectors';
import { DepartmentService } from '@map/services/department.service';
import { RootState } from '..';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class DepartmentEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private departmentService: DepartmentService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.getAll),
      mergeMap(() =>
        this.departmentService.getAll<Department[]>().pipe(
          map((departments: Department[]) =>
            DepartmentActions.getAllSuccess({ departments })
          ),
          catchError(() => of(DepartmentActions.getAllFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.select),
      withLatestFrom(this.store.select(DepartmentSelectors.selectEntities)),
      switchMap(([{ id }, departments]) => {
        const department = departments[id];
        if (department) {
          return of(
            DepartmentActions.selectSuccess({
              department,
            })
          );
        } else {
          return of(DepartmentActions.selectFailed());
        }
      }),
      catchError(() => of(DepartmentActions.selectFailed()))
    )
  );
}
