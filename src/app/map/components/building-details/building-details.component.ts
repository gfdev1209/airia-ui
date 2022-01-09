import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as BuildingActions from '@store/building/building.actions';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as RegionActions from '@store/region/region.actions';
import * as RegionSelectors from '@store/region/region.selectors';
import { tap } from 'rxjs/operators';
import { Region } from '@map/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.scss'],
})
export class BuildingDetailsComponent implements OnInit {
  building$ = this.store.select(BuildingSelectors.selectSelectedBuilding).pipe(
    tap((building) => {
      if (building) {
        this.region$ = this.store
          .select(RegionSelectors.selectByBuildingId, {
            buildingId: building.id,
          })
          .pipe(
            tap((region) => {
              this.store.dispatch(RegionActions.select({ id: region?.id }));
            })
          );
      }
    })
  );
  region$: Observable<Region> | undefined;
  showDetails$ = this.store.select(BuildingSelectors.selectShowDetails);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  onClosed(): void {
    this.store.dispatch(BuildingActions.deselect());
    this.store.dispatch(BuildingActions.hideDetails());
  }
}
