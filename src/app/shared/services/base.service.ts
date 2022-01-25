import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap, map, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Alert, Location } from '@map/models';
import { SkipTakeInput } from '@shared/models/skip-take-input.model';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected apiUrl = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    @Inject(String) protected apiName: string,
    protected http: HttpClient
  ) {
    this.apiUrl += apiName;
  }

  getAll<T>(appendToUrl: string = ''): Observable<T> {
    return this.http.get(`${this.apiUrl}/${appendToUrl}`).pipe(
      retry(2),
      map((response: any) => this.mapArrayResponseToObject<T>(response)),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }
  mapResponseToObject<T>(response: any): T {
    throw new Error('mapResponseToObject must be set in specified service');
    // const mapped = response.map((responseJson: any) =>
    //   this.factory<T>(responseJson)
    // );
    // return mapped;
  }
  mapArrayResponseToObject<T>(response: any): T {
    throw new Error(
      'mapArrayResponseToObject must be set in specified service'
    );
    // const mapped = response.map((responseJson: any) =>
    //   this.factory<T>(responseJson)
    // );
    // return mapped;
  }
  // factory<T>(C: new (args: any) => T, args?: any): Location {
  //   return new Location(args);
  // }

  get<T>(id: number, appendToUrl: string = ''): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}/${appendToUrl}`).pipe(
      retry(2),
      map((response: any) => this.mapResponseToObject<T>(response)),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
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

  skipAndTake<T>(
    skipTakeInput: SkipTakeInput,
    appendToUrl: string = '',
    params: string = ''
  ): Observable<T> {
    return this.http
      .get(
        `${this.apiUrl}/Skip/${skipTakeInput.skip}/Take/${skipTakeInput.take}${appendToUrl}?${params}`
      )
      .pipe(
        // retry(2),
        map((response: any) => this.mapArrayResponseToObject<T>(response)),
        catchError((error) => {
          return this.handleError(error);
        }),
        share()
      );
  }

  create<T>(data: any): Observable<T> {
    return this.http.post(`${this.apiUrl}`, data).pipe(
      catchError((error) => {
        return this.handleError(error);
      }),
      map((response: any) => response as T),
      share()
    );
  }

  update<T>(id: string | number, data: any): Observable<T> {
    // const jsonData = JSON.parse(
    //   JSON.stringify(data).replace(/[\/\(\)\']/g, '&apos;')
    // );
    // // prettier-ignore
    // const jsonData2 = JSON.stringify(data).replace(/'/g, '\\"');
    // throw new Error('test');
    return this.http.put(`${this.apiUrl}/${id}`, data).pipe(
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
