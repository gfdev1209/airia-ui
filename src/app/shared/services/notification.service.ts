import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private errorMessage: Subject<string> = new Subject<string>();
  errorMessage$: Observable<string> = this.errorMessage.asObservable();
  private error: Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();
  error$: Observable<HttpErrorResponse> = this.error.asObservable();

  constructor() {}

  displayError(error: HttpErrorResponse): void {
    this.error.next(error);
    this.errorMessage.next(
      error.error?.ErrorMessage
        ? error.error?.ErrorMessage
        : error.error?.message
    );
  }
}
