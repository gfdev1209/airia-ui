import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import * as AccessPointActions from '@store/access-point/access-point.actions';
import * as BuildingSelectors from '@store/building/building.selectors';
import { Input } from '@angular/core';
import { AccessPoint, Building } from '@map/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-building-details-access-points',
  templateUrl: './building-details-access-points.component.html',
  styleUrls: ['./building-details-access-points.component.scss'],
})
export class BuildingDetailsAccessPointsComponent implements OnInit {
  accessPoints$?: Observable<AccessPoint[]>;

  building$ = this.store.select(BuildingSelectors.selectSelectedBuilding).pipe(
    tap((building) => {
      if (building) {
        const buildingId = building.id;
        this.accessPoints$ = this.store.select(
          AccessPointSelectors.selectByBuildingId,
          {
            buildingId,
          }
        );
      }
    })
  );

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(AccessPointActions.getAll());
  }
}
