import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@shared/services/notification.service';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'airia';
  isIframe = false;

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
    private notificationService: NotificationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }

  displayError(error: HttpErrorResponse): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
    });
  }
}
