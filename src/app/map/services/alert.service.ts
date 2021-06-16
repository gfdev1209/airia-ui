import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Alert } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class AlertService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Alerts', httpClient);
  }

  mapResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Alert(responseJson));
  }
}
