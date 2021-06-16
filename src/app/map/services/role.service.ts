import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Role } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class AlertService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Roles', httpClient);
  }

  mapResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Role(responseJson));
  }
}
