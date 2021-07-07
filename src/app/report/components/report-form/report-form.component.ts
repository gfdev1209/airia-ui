import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as UserActions from '@store/user/user.actions';
import * as UserSelectors from '@store/user/user.selectors';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.deselect());
    this.store.dispatch(UserActions.getAll());
  }
}
