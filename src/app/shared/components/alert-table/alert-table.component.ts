import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as AlertActions from '@store/alert/alert.actions';
import * as AlertSelectors from '@store/alert/alert.selectors';

import * as BuildingActions from '@store/building/building.actions';
import * as BuildingSelectors from '@store/building/building.selectors';
import { Input } from '@angular/core';
import { Alert, Building } from '@map/models';
import { Observable } from 'rxjs';
import { SkipTakeInput } from '@shared/models/skip-take-input.model';
import { LazyLoadEvent } from 'primeng/api';
import { AlertService } from '@map/services/alert.service';

@Component({
  selector: 'app-alert-table',
  templateUrl: './alert-table.component.html',
  styleUrls: ['./alert-table.component.scss'],
})
export class AlertTableComponent implements OnInit {
  @Input() showCheckboxColumn = true;
  @Input() building?: Building | null;

  @Output() alertSelected = new EventEmitter<Alert>();
  @Output() alertDeselected = new EventEmitter<Alert>();

  alerts$?: Observable<Alert[]>;
  loading$ = this.store.select(AlertSelectors.selectLoading);
  buildings$ = this.store.select(BuildingSelectors.selectAll);

  rows = 10;
  totalRows = 200;

  sortField?: string;
  sortOrder?: number;

  constructor(
    private store: Store<RootState>,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    // if (!this.building) {
    // this.store.dispatch(AlertActions.getAll());
    // this.store.dispatch(BuildingActions.getAll());
    this.alerts$ = this.store.select(AlertSelectors.selectAll);
    // } else {
    //   this.alerts$ = this.store.select(AlertSelectors.selectByBuildingId, {
    //     buildingId: this.building.id,
    //   });
    // }
  }

  onLazyLoad(event: LazyLoadEvent): void {
    const skipTakeInput = this.alertService.createSkipTakeInput(
      event,
      this.rows
    );
    this.store.dispatch(AlertActions.skipAndTakeAlertTable({ skipTakeInput }));
  }
  onAlertSelected(alert: Alert): void {
    if (alert) {
      this.alertSelected.emit(alert);
    }
  }
  onAlertDeselected(alert: Alert): void {
    if (alert) {
      this.alertDeselected.emit(alert);
    }
  }
}
