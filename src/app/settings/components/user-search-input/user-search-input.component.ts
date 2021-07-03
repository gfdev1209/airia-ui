import { Component, OnInit } from '@angular/core';
import { User } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-search-input',
  templateUrl: './user-search-input.component.html',
  styleUrls: ['./user-search-input.component.scss'],
})
export class UserSearchInputComponent implements OnInit {
  searchResults$ = of([]);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  search(term: string): void {
    console.log('search', term);
    // this.store.dispatch(UserActions.search({ term }));
  }
  selectUser(user: User): void {
    // this.store.dispatch(UserActions.select({ id: user.id }));
  }
}
