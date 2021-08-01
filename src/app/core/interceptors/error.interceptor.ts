import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotificationService } from '@shared/services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // check for internet connection
        if (!navigator.onLine) {
          console.warn('No internet connection');
        }
        this.notificationService.displayError(error);

        // handle HTTP errors
        switch (error.status) {
          case 401:
            console.log('401 error');
            break;
          case 403:
            console.error('403 error. Redirect to login');
            break;
          case 404:
            console.log('404 error');
            break;
          case 500:
            console.log('500 error');
            break;
          default:
            console.log('default error');
        }
        return throwError(error);
      })
    );
  }
}
