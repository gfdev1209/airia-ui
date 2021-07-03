import { Component, OnInit } from '@angular/core';
import { User } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as UserActions from '@store/user/user.actions';
import * as UserSelectors from '@store/user/user.selectors';

@Component({
  selector: 'app-user-search-input',
  templateUrl: './user-search-input.component.html',
  styleUrls: ['./user-search-input.component.scss'],
})
export class UserSearchInputComponent implements OnInit {
  searchResults$ = this.store.select(UserSelectors.selectSearchResults);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  search(term: string): void {
    this.store.dispatch(UserActions.search({ term }));
  }
  selectUser(user: User): void {
    this.store.dispatch(UserActions.select({ id: user.id }));
  }
}
