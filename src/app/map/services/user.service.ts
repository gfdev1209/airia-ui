import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}AccessPoints`)
      .pipe(tap((response) => console.log('self', response)));
  }
}
