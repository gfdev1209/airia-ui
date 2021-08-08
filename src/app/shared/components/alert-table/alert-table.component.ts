import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as AlertActions from '@store/alert/alert.actions';
import * as AlertSelectors from '@store/alert/alert.selectors';

import * as BuildingActions from '@store/building/building.actions';
import * as BuildingSelectors from '@store/building/building.selectors';
import { Input } from '@angular/core';
import { Alert, Building } from '@map/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alert-table',
  templateUrl: './alert-table.component.html',
  styleUrls: ['./alert-table.component.scss'],
})
export class AlertTableComponent implements OnInit {
  @Input() showCheckboxColumn = true;
  @Input() building?: Building | null;

  alerts$?: Observable<Alert[]>;
  loading$ = this.store.select(AlertSelectors.selectLoading);
  buildings$ = this.store.select(BuildingSelectors.selectAll);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    // if (!this.building) {
    this.store.dispatch(AlertActions.getAll());
    this.store.dispatch(BuildingActions.getAll());
    this.alerts$ = this.store.select(AlertSelectors.selectAll);
    // } else {
    //   this.alerts$ = this.store.select(AlertSelectors.selectByBuildingId, {
    //     buildingId: this.building.id,
    //   });
    // }
  }
}
