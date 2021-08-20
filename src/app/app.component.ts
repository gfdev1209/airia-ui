import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '@shared/services/notification.service';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';
import * as UserActions from '@store/user/user.actions';
import * as UserSelectors from '@store/user/user.selectors';
import { RootState } from './store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'airia';
  isIframe = false;

  self$ = this.store.select(UserSelectors.selectSelf).subscribe();

  error$ = this.notificationService.error$
    .pipe(
      tap((error) => {
        if (error !== null) {
          this.displayError(error);
        }
      })
    )
    .subscribe();

  constructor(
    private store: Store<RootState>,
    private notificationService: NotificationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.getSelf());
    this.isIframe = window !== window.parent && !window.opener;
  }

  displayError(error: HttpErrorResponse): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
    });
  }

  ngOnDestroy(): void {
    this.self$?.unsubscribe();
  }
}
