import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap, map, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected apiUrl = environment.apiUrl;

  constructor(
    @Inject(String) protected apiName: string,
    protected http: HttpClient
  ) {
    this.apiUrl += apiName;
  }

  getAll<T>(): Observable<T> {
    return this.http.get(`${this.apiUrl}/`).pipe(
      retry(2),
      map((response: any) => response as T),
      share()
    );
  }

  get<T>(id: number): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}/${id}`)
      .pipe(map((response: any) => response as T));
  }

  getByQuery<T>(id: number, queryParams: any): Observable<T> {
    return this.http.get(`${this.apiUrl}/${id}`, { params: queryParams }).pipe(
      retry(2),
      catchError((error) => {
        return this.handleError(error);
      }),
      map((response: any) => response as T),
      share()
    );
  }

  create<T>(data: any): Observable<T> {
    return this.http.post(`${this.apiUrl}/Create`, data).pipe(
      // catchError((error) => {
      //   return this.handleError(error);
      // }),
      map((response: any) => response as T),
      share()
    );
  }

  update<T>(data: any): Observable<T> {
    return this.http.put(`${this.apiUrl}/Update`, data).pipe(
      catchError((error) => {
        return this.handleError(error);
      }),
      map((response: any) => response as T),
      share()
    );
  }

  delete<T>(id: number): Observable<T> {
    return this.http.delete(`${this.apiUrl}/Delete?id=${id}`).pipe(
      // catchError((error) => {
      //   return this.handleError(error);
      // }),
      map((response: any) => response as T),
      share()
    );
  }

  // search<T>(term: string): Observable<T[]> {
  //   return this.http.get(`${this.apiUrl}/Search?term=${term}`).pipe(
  //     // catchError((error) => {
  //     //   return this.handleError(error);
  //     // }),
  //     map((response: any) => response as T[]),
  //     share()
  //   );
  // }
  handleError(error: any): Observable<any> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(errorMessage);
  }
}
