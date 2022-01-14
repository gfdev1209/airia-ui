import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Building, Occupancy, Region } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as BuildingSelectors from '@store/building/building.selectors';
import * as RegionSelectors from '@store/region/region.selectors';
import * as RegionActions from '@store/region/region.actions';

import * as moment from 'moment';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegionService } from '@map/services/region.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
  occupancy$?: Observable<Occupancy[]>;

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  constructor(
    private store: Store<RootState>,
    private regionService: RegionService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.region) {
      this.regionId = changes.region.currentValue?.id;
      this.curDate = new Date();
      this.getOccupancyData(
        changes.region.currentValue?.id,
        moment(this.curDate).year(),
        moment(this.curDate).month(),
        moment(this.curDate).date()
      );
    }
  }

  getOccupancyData(
    regionId: number,
    year: number,
    month: number,
    day?: number
  ): void {
    this.loading.next(true);
    this.occupancy$ = this.regionService
      .getOccupancyRange(
        regionId,
        moment(new Date(year, month, day))
          .utc()
          .startOf('day')
          .subtract(environment.timeZoneOffsetUTC, 'hour')
          .toDate(),
        moment(new Date(year, month, day))
          .utc()
          .endOf('day')
          .subtract(environment.timeZoneOffsetUTC, 'hour')
          .toDate()
      )
      .pipe(
        tap(() => {
          this.loading.next(false);
        })
      );
  }

  onOccupancyDateChanged(date: Date): void {
    console.log(date);
    if (this.regionId) {
      this.curDate = date;
      this.getOccupancyData(
        this.regionId,
        moment(date).year(),
        moment(date).month(),
        moment(date).date()
      );
    }
  }

  onHistoricDateRangeChanged(dateRange: Date[]): void {
    console.log(dateRange);
  }
}
