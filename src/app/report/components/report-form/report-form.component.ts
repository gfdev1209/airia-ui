import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as UserActions from '@store/user/user.actions';
import * as BuildingActions from '@store/building/building.actions';
import * as ReportSelectors from '@store/report/report.selectors';
import * as ReportActions from '@store/report/report.actions';
import * as AlertActions from '@store/alert/alert.actions';
import { CreateReportInput } from '../../models';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
  loading$ = this.store.select(ReportSelectors.selectLoading);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(BuildingActions.deselect());
    this.store.dispatch(UserActions.deselect());
    this.store.dispatch(UserActions.getAll());
    // this.store.dispatch(
    //   AlertActions.skipAndTakeAlertTable({
    //     skipTakeInput: { skip: 0, take: 100, sortOrder: -1 },
    //   })
    // );
  }

  onGenerateReport(createReportInput: CreateReportInput): void {
    this.store.dispatch(ReportActions.create({ createReportInput }));
  }
}
