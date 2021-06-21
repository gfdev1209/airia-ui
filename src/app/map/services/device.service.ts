import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base.service';
import { Device } from '@map/models';

@Injectable({
  providedIn: 'root',
})
export class DeviceService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Devices', httpClient);
  }

  mapResponseToObject<T>(response: any): T {
    return new Device(response) as any;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Device(responseJson));
  }
}
