import { Component, Input } from '@angular/core';
import { Building } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as BuildingSelectors from '@store/building/building.selectors';

@Component({
  selector: 'app-building-details-overview',
  templateUrl: './building-details-overview.component.html',
  styleUrls: ['./building-details-overview.component.scss'],
})
export class BuildingDetailsOverviewComponent {
  @Input() building?: Building | null;
  @Input() maximized!: boolean;

  analytics$ = this.store.select(BuildingSelectors.selectAnalytics);

  constructor(private store: Store<RootState>) {}

  onOccupancyDateChanged(date: Date): void {
    console.log(date);
  }

  onHistoricDateRangeChanged(dateRange: Date[]): void {
    console.log(dateRange);
  }
}
