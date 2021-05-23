import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './store';

import * as BuildingActions from './store/building/building.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'airia';
  constructor(private store: Store<RootState>) {
    this.store.dispatch(BuildingActions.getAll());
  }
}
