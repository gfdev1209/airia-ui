import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as AlertSelectors from '@store/alert/alert.selectors';
import * as AlertActions from '@store/alert/alert.actions';
import { Alert } from '@map/models';
import * as UserSelectors from '@store/user/user.selectors';

@Component({
  selector: 'app-alert-details',
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.scss'],
})
export class AlertDetailsComponent implements OnInit {
  selectedAlert$ = this.store.select(AlertSelectors.selectSelectedAlert);
  user$ = this.store.select(UserSelectors.selectSelf);
  loading$ = this.store.select(AlertSelectors.selectLoading);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  onAcknowledgeAlert(alert: Alert): void {
    this.store.dispatch(AlertActions.acknowledgeAlert({ alert }));
  }

  closeAlert(): void {
    this.store.dispatch(AlertActions.deselect());
  }
}
