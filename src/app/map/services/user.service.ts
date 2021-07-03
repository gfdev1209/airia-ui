import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { User } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Users', httpClient);
  }

  mapResponseToObject<T>(response: any): T {
    return new User(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response?.$values.map((responseJson: any) => new User(responseJson));
  }
}
