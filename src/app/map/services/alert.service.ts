import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AlertType } from '@map/enums';
import { Alert } from '@map/models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('alerts', httpClient);
  }

  // getAll(): Observable<Alert[]> {
  //   return this.httpClient.get<Alert[]>(`${this.baseUrl}api/alerts`);
  // }
  // get(id: number): Observable<Alert> {
  //   return this.httpClient.get<Alert>(`${this.baseUrl}api/alerts/${id}`);
  // }
}
