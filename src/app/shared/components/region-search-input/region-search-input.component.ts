import { Component, OnInit } from '@angular/core';
import { Region } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as RegionSelectors from '@store/region/region.selectors';
import * as RegionActions from '@store/region/region.actions';

@Component({
  selector: 'app-region-search-input',
  templateUrl: './region-search-input.component.html',
  styleUrls: ['./region-search-input.component.scss'],
})
export class RegionSearchInputComponent implements OnInit {
  searchResults$ = this.store.select(RegionSelectors.selectSearchResults);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  search(term: string): void {
    this.store.dispatch(RegionActions.search({ term }));
  }
  selectRegion(region: Region): void {
    this.store.dispatch(RegionActions.select({ id: region.id }));
  }
}
