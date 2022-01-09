import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Building, Occupancy, Region } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as BuildingSelectors from '@store/building/building.selectors';
import { RegionService } from '@map/services/region.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';

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
        const curDate = moment(new Date());
        this.getOccupancyData(
          this.regionId,
          moment(curDate).subtract(1, 'year').year(),
          moment(curDate).subtract(1, 'month').month() + 1
        );
      }
    }
  }

  getOccupancyData(
    regionId: number,
    year: number,
    month: number,
    startDate?: Date,
    endDate?: Date
  ): void {
    this.occupancy$ = this.regionService.getOccupancy(regionId, year, month);
  }

  onOccupancyDateChanged(date: Date): void {
    console.log(date);
  }

  onHistoricDateRangeChanged(dateRange: Date[]): void {
    console.log(dateRange);
  }
}
