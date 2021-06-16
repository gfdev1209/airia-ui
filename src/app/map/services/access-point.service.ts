import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { AccessPoint } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class AccessPointService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('AccessPoints', httpClient);
  }

  mapResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new AccessPoint(responseJson));
  }
}
