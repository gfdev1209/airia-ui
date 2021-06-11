import { Component, OnInit } from '@angular/core';
import { AlertService } from '@map/services/alert.service';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as AlertActions from '@store/alert/alert.actions';
import * as AlertSelectors from '@store/alert/alert.selectors';

@Component({
  selector: 'app-alert-table',
  templateUrl: './alert-table.component.html',
  styleUrls: ['./alert-table.component.scss'],
})
export class AlertTableComponent implements OnInit {
  alerts$ = this.store.select(AlertSelectors.selectAll);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(AlertActions.getAll());
  }
}
