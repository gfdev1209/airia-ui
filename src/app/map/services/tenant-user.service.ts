import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { TenantUser } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class TenantUserService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('TenantUsers', httpClient);
  }
  mapResponseToObject<T>(response: any): T {
    return new TenantUser(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new TenantUser(responseJson));
  }
}
