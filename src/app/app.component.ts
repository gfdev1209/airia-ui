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

  // error$ = this.notificationService.error$
  //   .pipe(
  //     tap((error) => {
  //       if (error !== null) {
  //         this.displayError(error);
  //       }
  //     })
  //   )
  //   .subscribe();

  errorMessage$ = this.notificationService.errorMessage$
    .pipe(
      tap((errorMessage) => {
        if (errorMessage !== null) {
          this.displayErrorMessage(errorMessage);
        }
      })
    )
    .subscribe();
  successMessage$ = this.notificationService.successMessage$
    .pipe(
      tap((successMessage) => {
        if (successMessage !== null) {
          this.displaySuccessMessage(successMessage);
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
    this.addMessageToService(error.message, 'error', 'Error');
  }

  displayErrorMessage(error: string): void {
    this.addMessageToService(error, 'error', 'Error');
  }

  displaySuccessMessage(message: string): void {
    this.addMessageToService(message, 'success', 'Success');
  }

  private addMessageToService(
    message: string,
    severity: string,
    summary: string
  ): void {
    this.messageService.add({
      severity,
      summary,
      detail: message,
      sticky: false,
    });
  }

  ngOnDestroy(): void {
    this.self$?.unsubscribe();
  }
}
