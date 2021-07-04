import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Department } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Departments', httpClient);
  }

  mapResponseToObject<T>(response: any): T {
    return new Department(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Department(responseJson));
  }
}
