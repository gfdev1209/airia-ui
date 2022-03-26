import { Component, OnInit } from '@angular/core';
import * as RegionSelectors from '@store/region/region.selectors';
import * as RegionActions from '@store/region/region.actions';
import * as UserSelectors from '@store/user/user.selectors';
import { Region } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

@Component({
  selector: 'app-regions-table',
  templateUrl: './regions-table.component.html',
  styleUrls: ['./regions-table.component.scss'],
})
export class RegionsTableComponent implements OnInit {
  regions$ = this.store.select(RegionSelectors.selectActiveRegions);
  self$ = this.store.select(UserSelectors.selectSelf);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(RegionActions.getAll());
  }

  regionSelected(region: Region): void {
    this.store.dispatch(RegionActions.select({ id: region.id }));
  }
}
