import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as BuildingActions from '@store/building/building.actions';
import * as BuildingSelectors from '@store/building/building.selectors';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.scss'],
})
export class BuildingDetailsComponent implements OnInit {
  building$ = this.store.select(BuildingSelectors.selectSelectedBuilding);
  showDetails$ = this.store.select(BuildingSelectors.selectShowDetails);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  onClosed(): void {
    this.store.dispatch(BuildingActions.hideDetails());
  }
}
