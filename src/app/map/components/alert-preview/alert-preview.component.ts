import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { Alert } from '../../models';
import * as AlertActions from '../../../store/alert/alert.actions';

@Component({
  selector: 'app-alert-preview',
  templateUrl: './alert-preview.component.html',
  styleUrls: ['./alert-preview.component.scss'],
})
export class AlertPreviewComponent {
  @Input() alert?: Alert;
  @Input() isSelected = false;

  constructor(private store: Store<RootState>) {}

  alertSelected(alert: Alert): void {
    this.store.dispatch(AlertActions.deselect());
    setTimeout(
      () => this.store.dispatch(AlertActions.select({ id: alert.id })),
      300
    );
  }
}
