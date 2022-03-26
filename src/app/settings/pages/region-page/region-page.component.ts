import { Component, OnDestroy, OnInit } from '@angular/core';
import * as UserSelectors from '@store/user/user.selectors';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import AccessLevels from '@core/utils/access-levels';
import { User } from '@map/models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-region-page',
  templateUrl: './region-page.component.html',
  styleUrls: ['./region-page.component.scss'],
})
export class RegionPageComponent implements OnInit, OnDestroy {
  self$ = this.store
    .select(UserSelectors.selectSelf)
    .pipe(tap((user) => (this.self = user)))
    .subscribe();
  self?: User | null;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  canEdit(): boolean {
    if (this.self?.role) {
      return AccessLevels.roleHasAccessLevel(
        this.self.role.name,
        AccessLevels.CanEdit
      );
    }
    return false;
  }
  ngOnDestroy(): void {
    this.self$?.unsubscribe();
  }
}
