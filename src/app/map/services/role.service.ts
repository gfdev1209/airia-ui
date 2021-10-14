import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { UserRole } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Roles', httpClient);
  }
  mapResponseToObject<T>(response: any): T {
    return new UserRole(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new UserRole(responseJson));
  }
}
