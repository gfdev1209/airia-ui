import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { Region, Occupancy } from '@map/models';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegionService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Regions', httpClient);
  }
  getOccupancy(
    id: number,
    year?: number,
    month?: number,
    day?: number
  ): Observable<Occupancy[]> {
    return this.http.get(`${this.apiUrl}/${id}/Occupancy`).pipe(
      map((response: any) =>
        this.mapArrayResponseToObject<Occupancy[]>(response)
      ),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }
  mapResponseToObject<T>(response: any): T {
    const region = new Region(response) as any;
    return region;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Region(responseJson));
  }
}
