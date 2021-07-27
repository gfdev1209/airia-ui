import { Component, OnInit } from '@angular/core';
import { AccessPoint } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import * as AccessPointActions from '@store/access-point/access-point.actions';

@Component({
  selector: 'app-access-point-search-input',
  templateUrl: './access-point-search-input.component.html',
  styleUrls: ['./access-point-search-input.component.scss'],
})
export class AccessPointSearchInputComponent implements OnInit {
  searchResults$ = this.store.select(AccessPointSelectors.selectSearchResults);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  search(term: string): void {
    this.store.dispatch(AccessPointActions.search({ term }));
  }
  selectAccessPoint(accessPoint: AccessPoint): void {
    this.store.dispatch(AccessPointActions.select({ id: accessPoint.id }));
  }
}
