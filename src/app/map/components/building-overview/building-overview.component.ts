import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import * as FloorSelectors from '@store/floor/floor.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-building-overview',
  templateUrl: './building-overview.component.html',
  styleUrls: ['./building-overview.component.scss'],
})
export class BuildingOverviewComponent implements OnInit {
  building$ = this.store.select(BuildingSelectors.selectSelectedBuilding).pipe(
    tap((building) => {
      if (building) {
        this.store.dispatch(
          FloorActions.getByBuildingId({ buildingId: building.id })
        );
      }
    })
  );
  show$ = this.store.select(BuildingSelectors.selectShowOverview);
  floors$ = this.store.select(FloorSelectors.selectAll);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  showDetails(show: boolean): void {
    if (show === true) {
      this.store.dispatch(BuildingActions.showDetails());
    }
  }

  closePanel(): void {
    this.store.dispatch(BuildingActions.deselect());
    this.store.dispatch(BuildingActions.hideOverview());
  }
}
