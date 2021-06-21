import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Floor } from '@map/models';
import { BaseService } from '@shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class FloorService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Floors', httpClient);
  }
  mapResponseToObject<T>(response: any): T {
    return new Floor(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Floor(responseJson));
  }
}
