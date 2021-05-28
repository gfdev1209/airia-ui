import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<any> {
    return this.http
      .get('https://api.dev.airia20.com/api/Users/Self')
      .pipe(tap((response) => console.log('self', response)));
  }
}
