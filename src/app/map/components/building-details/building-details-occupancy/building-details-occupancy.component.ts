import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Building, Occupancy, Region } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as BuildingSelectors from '@store/building/building.selectors';
import { RegionService } from '@map/services/region.service';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-building-details-occupancy',
  templateUrl: './building-details-occupancy.component.html',
  styleUrls: ['./building-details-occupancy.component.scss'],
})
export class BuildingDetailsOccupancyComponent implements OnChanges {
  @Input() building?: Building | null;
  @Input() region?: Region | null;
  @Input() maximized!: boolean;
  @Input() tabChange: any;

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  analytics$ = this.store.select(BuildingSelectors.selectAnalytics);

  occupancy$?: Observable<Occupancy[]>;

  private regionId?: number;

  constructor(
    private store: Store<RootState>,
    private regionService: RegionService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.region) {
      this.regionId = changes.region.currentValue?.id;
      if (this.regionId) {
        this.getOccupancyData(
          this.regionId,
          moment
            .utc()
            .subtract(1, 'week')
            .startOf('week')
            .subtract(environment.timeZoneOffsetUTC, 'hour')
            .toDate(),
          moment
            .utc()
            .subtract(1, 'week')
            .endOf('week')
            .subtract(environment.timeZoneOffsetUTC, 'hour')
            .toDate()
        );
      }
    }
  }

  getOccupancyData(regionId: number, startDate: Date, endDate: Date): void {
    this.loading.next(true);
    this.occupancy$ = this.regionService
      .getOccupancyRange(regionId, startDate, endDate)
      .pipe(
        tap(() => {
          this.loading.next(false);
        })
      );
  }

  onOccupancyDateChanged(date: Date): void {
    console.log(date);
  }

  onHistoricDateRangeChanged(dateRange: Date[]): void {
    console.log(dateRange);
    if (this.regionId) {
      this.getOccupancyData(this.regionId, dateRange[0], dateRange[1]);
    }
  }
}
