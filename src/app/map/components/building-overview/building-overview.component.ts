import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';

@Component({
  selector: 'app-building-overview',
  templateUrl: './building-overview.component.html',
  styleUrls: ['./building-overview.component.scss'],
})
export class BuildingOverviewComponent implements OnInit {
  building$ = this.store.select(BuildingSelectors.selectSelectedBuilding);
  show$ = this.store.select(BuildingSelectors.selectShowOverview);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  closePanel(): void {
    this.store.dispatch(BuildingActions.deselect());
    this.store.dispatch(BuildingActions.hideOverview());
  }
}
