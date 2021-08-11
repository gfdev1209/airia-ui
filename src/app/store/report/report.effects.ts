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
import { concat, of } from 'rxjs';
import * as ReportActions from './report.actions';
import * as ReportSelectors from './report.selectors';
import { RootState } from '..';
import { Store } from '@ngrx/store';
import { ReportService } from 'src/app/report/services/report.service';
import { Report } from 'src/app/report/models';

@Injectable({
  providedIn: 'root',
})
export class ReportEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private reportService: ReportService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.getAll),
      mergeMap(() =>
        this.reportService.getAll<Report[]>().pipe(
          map((reports: Report[]) => ReportActions.getAllSuccess({ reports })),
          catchError(() => of(ReportActions.getAllFailed()))
        )
      )
    )
  );

  getByBuildingId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.getByBuildingId),
      mergeMap(({ buildingId }) =>
        this.reportService.getAll<Report[]>().pipe(
          map((reports: Report[]) =>
            ReportActions.getByBuildingIdSuccess({ reports })
          ),
          catchError(() => of(ReportActions.getByBuildingIdFailed()))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.select),
      withLatestFrom(this.store.select(ReportSelectors.selectEntities)),
      switchMap(([{ id }, reports]) => {
        const report = reports[id];
        if (report) {
          return of(
            ReportActions.selectSuccess({
              report,
            })
          );
        } else {
          return of(ReportActions.selectFailed());
        }
      }),
      catchError(() => of(ReportActions.selectFailed()))
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.create),
      mergeMap(({ createReportInput }) =>
        this.reportService.create<Report>(createReportInput).pipe(
          mergeMap((report: Report) =>
            concat(
              of(ReportActions.createSuccess({ report })),
              of(ReportActions.closeFormModal())
            )
          ),
          catchError(() =>
            of(ReportActions.createFailed(), ReportActions.closeFormModal())
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.update),
      mergeMap(({ report }) =>
        this.reportService.update<Report>(report.id, report.changes).pipe(
          mergeMap(() =>
            concat(
              of(ReportActions.updateSuccess({ report })),
              of(ReportActions.closeFormModal())
            )
          ),
          catchError(() =>
            of(ReportActions.updateFailed(), ReportActions.closeFormModal())
          )
        )
      )
    )
  );
}
