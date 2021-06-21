import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Tenant } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class TenantService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Tenants', httpClient);
  }
  mapResponseToObject<T>(response: any): T {
    return new Tenant(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Tenant(responseJson));
  }
}
