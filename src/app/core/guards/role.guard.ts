import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as UserSelectors from '@store/user/user.selectors';
import { RootState } from '@store/index';
import { NotificationService } from '@shared/services/notification.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  self$ = this.store
    .select(UserSelectors.selectSelf)
    .pipe(
      tap((user) => {
        if (user?.role) {
          this.userRole = user.role?.name;
        }
      })
    )
    .subscribe();

  userRole?: string;

  constructor(
    private store: Store<RootState>,
    private notificationService: NotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data.role as string;
    if (this.userRole === role) {
      this.self$.unsubscribe();
      return true;
    }
    this.notificationService.displayMessage(
      'You do not have access to view this page'
    );
    this.self$.unsubscribe();
    return false;
  }
}
