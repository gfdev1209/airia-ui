import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('alerts', httpClient);
  }
}
