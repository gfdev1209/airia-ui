import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Building } from '@map/models';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BuildingService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Buildings', httpClient);
  }
  mapResponseToObject<T>(response: any): T {
    const building = new Building(response) as any;
    return building;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Building(responseJson));
  }
}
