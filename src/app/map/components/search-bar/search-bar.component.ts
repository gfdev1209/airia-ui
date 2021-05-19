import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { Building } from '../../models';
import * as BuildingActions from './../../../store/building/building.actions';
import * as BuildingSelectors from './../../../store/building/building.selectors';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
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
