import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private successMessage: Subject<string> = new Subject<string>();
  successMessage$: Observable<string> = this.successMessage.asObservable();
  private errorMessage: Subject<string> = new Subject<string>();
  errorMessage$: Observable<string> = this.errorMessage.asObservable();
  private error: Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();
  error$: Observable<HttpErrorResponse> = this.error.asObservable();

  constructor() {}

  displaySuccess(message: string): void {
    this.successMessage.next(message);
  }

  displayError(error: HttpErrorResponse): void {
    this.error.next(error);
    this.errorMessage.next(
      error.error?.Error ? error.error?.Error : error.message
    );
  }

  displayMessage(message: string): void {
    this.error.next();
    this.errorMessage.next(message);
  }
}
