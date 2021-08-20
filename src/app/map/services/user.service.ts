import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { User } from '@map/models';
import { Observable, pipe } from 'rxjs';
import { retry, map, catchError, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Users', httpClient);
  }

  getSelf(appendToUrl: string = ''): Observable<User> {
    return this.httpClient.get(`${this.apiUrl}/Self/${appendToUrl}`).pipe(
      retry(2),
      map((response: any) => this.mapResponseToObject(response)),
      catchError((error: any) => this.handleError(error)),
      share()
    );
  }

  mapResponseToObject<T>(response: any): T {
    return new User(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new User(responseJson));
  }
}
