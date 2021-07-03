import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as AlertActions from '@store/alert/alert.actions';
import * as AlertSelectors from '@store/alert/alert.selectors';

import * as BuildingActions from '@store/building/building.actions';
import * as BuildingSelectors from '@store/building/building.selectors';

@Component({
  selector: 'app-alert-table',
  templateUrl: './alert-table.component.html',
  styleUrls: ['./alert-table.component.scss'],
})
export class AlertTableComponent implements OnInit {
  alerts$ = this.store.select(AlertSelectors.selectAll);
  buildings$ = this.store.select(BuildingSelectors.selectAll);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(AlertActions.getAll());
    this.store.dispatch(BuildingActions.getAll());
  }
}
