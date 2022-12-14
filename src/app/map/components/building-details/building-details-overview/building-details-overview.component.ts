import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Building, BuildingAnalytics, Occupancy, Region } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as BuildingSelectors from '@store/building/building.selectors';

import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegionService } from '@map/services/region.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { BuildingService } from '@map/services/building.service';
import { NotificationService } from '@shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-building-details-overview',
  templateUrl: './building-details-overview.component.html',
  styleUrls: ['./building-details-overview.component.scss'],
})
export class BuildingDetailsOverviewComponent implements OnChanges {
  @Input() building?: Building | null;
  @Input() region?: Region | null;
  @Input() maximized!: boolean;

  private regionId?: number;
  private curDate: Date = new Date();

  analytics$ = this.store.select(BuildingSelectors.selectAnalytics);
  historicData$?: Observable<Occupancy>;
  occupancy$?: Observable<Occupancy>;
  analytics24Hours$?: Observable<BuildingAnalytics>;

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  private historicLoading = new BehaviorSubject<boolean>(false);
  historicLoading$ = this.historicLoading.asObservable();

  constructor(
    private store: Store<RootState>,
    private regionService: RegionService,
    private buildingService: BuildingService,
    private notificationService: NotificationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.region) {
      this.regionId = changes.region.currentValue?.id;
      let buildingId = changes.region.currentValue?.buildingId;
      if(changes?.region.firstChange){
          if(!this.regionId && !buildingId){
            let error ={message: "This building does not have a properly defined and active region"} as HttpErrorResponse;
            this.notificationService.displayError(error);
          }
        
      }
      

      this.curDate = new Date();
      this.onOccupancyDateChanged(
        moment(this.curDate)
          .startOf('day')
          .utc()
          .toDate()
      );
    }
    if (changes?.building) {
      if (changes.building.currentValue && changes.building.currentValue.id) {
        const prev24Hours = moment().subtract(24, 'hours').toDate();
        this.analytics24Hours$ = this.buildingService.getAnalytics(
          changes.building.currentValue.id,
          prev24Hours,
          new Date()
        );
      }
    }
  }

  getOccupancyData(
    regionId: number,
    startDate: Date,
    endDate: Date
  ): Observable<Occupancy> {
    return this.regionService.getOccupancyRange(regionId, startDate, endDate);
  }

  getHistoricData(date: Date[]): void {
    this.historicLoading.next(true);
    if (this.regionId) {
      this.historicData$ = this.getOccupancyData(
        this.regionId,
        moment(date[0])
          .startOf('day')
          .utc()
          .toDate(),
        moment(date[1])
          .endOf('day')
          .utc()
          .toDate()
      ).pipe(
        tap((response) => {
          this.historicLoading.next(false);
        })
      );
    }
  }

  onOccupancyDateChanged(date: Date): void {
    if (this.regionId) {
      this.curDate = date;
      this.loading.next(true);
      this.occupancy$ = this.getOccupancyData(
        this.regionId,
        moment(date)
          .startOf('day')
          .utc()
          .toDate(),
        moment(date)
          .endOf('day')
          .utc()
          .toDate()
      ).pipe(
        tap((response) => {
          this.loading.next(false);
        })
      );
    }
  }

  onHistoricDateRangeChanged(dateRange: Date[]): void {
    this.getHistoricData(dateRange);
  }
}
