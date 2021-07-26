import { Component, OnInit } from '@angular/core';
import { Building } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';

@Component({
  selector: 'app-building-search-input',
  templateUrl: './building-search-input.component.html',
  styleUrls: ['./building-search-input.component.scss'],
})
export class BuildingSearchInputComponent implements OnInit {
  searchResults$ = this.store.select(BuildingSelectors.selectSearchResults);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  search(term: string): void {
    this.store.dispatch(BuildingActions.search({ term }));
  }
  selectBuilding(building: Building): void {
    this.store.dispatch(BuildingActions.select({ id: building.id }));
  }
}
