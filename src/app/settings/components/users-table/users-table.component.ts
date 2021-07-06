import { Component, OnInit } from '@angular/core';
import { User } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as UserActions from '@store/user/user.actions';
import * as UserSelectors from '@store/user/user.selectors';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  users$ = this.store.select(UserSelectors.selectAll);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  userSelected(user: User): void {
    this.store.dispatch(UserActions.select({ id: user.id }));
  }
}
