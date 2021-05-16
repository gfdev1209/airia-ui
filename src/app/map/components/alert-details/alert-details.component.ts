import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as AlertSelectors from '../../../store/alert/alert.selectors';
import * as AlertActions from '../../../store/alert/alert.actions';

@Component({
  selector: 'app-alert-details',
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.scss'],
})
export class AlertDetailsComponent implements OnInit {
  selectedAlert$ = this.store.select(AlertSelectors.selectSelectedAlert);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  closeAlert(): void {
    this.store.dispatch(AlertActions.deselect());
  }
}
