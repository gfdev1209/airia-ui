import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class FloorService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('floors', httpClient);
  }
}
