import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, retry, share } from 'rxjs/operators';
import { Building, BuildingAnalytics } from '@map/models';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BuildingService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super('Buildings', httpClient);
  }
  getAnalytics(
    buildingId: number,
    startDate?: Date,
    endDate?: Date
  ): Observable<BuildingAnalytics> {
    return this.http.get(`${this.apiUrl}/${buildingId}/Analytics`).pipe(
      map((response: any) => new BuildingAnalytics(response)),
      catchError((error) => {
        return this.handleError(error);
      }),
      share()
    );
  }
  mapResponseToObject<T>(response: any): T {
    const building = new Building(response) as any;
    return building;
  }
  mapArrayResponseToObject<T>(response: any): T {
    return response.map((responseJson: any) => new Building(responseJson));
  }
}
