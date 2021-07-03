import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as UserActions from '@store/user/user.actions';
import * as UserSelectors from '@store/user/user.selectors';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit, OnDestroy {
  userSelected$?: Subscription;

  constructor(
    private store: Store<RootState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.deselect());
    this.store.dispatch(UserActions.getAll());
    this.userSelected$ = this.store
      .select(UserSelectors.selectSelectedUser)
      .pipe(tap((user) => this.userSelected(user)))
      .subscribe();
  }

  userSelected(user: User | null): void {
    if (user) {
      this.router.navigate([`${user.id}`], { relativeTo: this.route });
    }
  }

  ngOnDestroy(): void {
    this.userSelected$?.unsubscribe();
  }
}
