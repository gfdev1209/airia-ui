import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Building, Region } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as BuildingSelectors from '@store/building/building.selectors';
import * as RegionSelectors from '@store/region/region.selectors';
import * as RegionActions from '@store/region/region.actions';

import * as moment from 'moment';
import { map, tap } from 'rxjs/operators';

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
  loading$ = this.store.select(RegionSelectors.selectLoading);
  occupancy$ = this.store
    .select(RegionSelectors.selectOccupancy)
    .pipe(
      map((occupancy) =>
        occupancy.filter((o) => o.day === moment(this.curDate).date())
      )
    );

  constructor(private store: Store<RootState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.region) {
      this.regionId = changes.region.currentValue?.id;
      this.curDate = new Date();
      this.getOccupancyData(
        changes.region.currentValue?.id,
        moment(this.curDate).year(),
        moment(this.curDate).month() + 1,
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
    this.store.dispatch(
      RegionActions.getOccupancy({
        id: regionId,
        year,
        month,
        day,
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
        moment(date).month() + 1,
        moment(date).date()
      );
    }
  }

  onHistoricDateRangeChanged(dateRange: Date[]): void {
    console.log(dateRange);
  }
}
