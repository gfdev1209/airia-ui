import { Component, OnInit } from '@angular/core';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import * as FloorSelectors from '@store/floor/floor.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { Building } from '@map/models';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.scss'],
})
export class BuildingFormComponent implements OnInit {
  building$ = this.store.select(BuildingSelectors.selectSelectedBuilding).pipe(
    tap((building) => {
      if (!building && this.buildingId) {
        this.store.dispatch(BuildingActions.select({ id: +this.buildingId }));
      }
    })
  );
  floors$ = this.store.select(FloorSelectors.selectAll);

  buildingId?: string | null;

  constructor(private store: Store<RootState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.buildingId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(FloorActions.getAll());
  }

  updateBuilding(building: Building): void {
    const buildingUpdate: Update<Building> = {
      id: building.id,
      changes: {
        buildingClassification: building.buildingClassification,
        // tslint:disable-next-line:quotemark
        // prettier-ignore
        buildingDescription: building.buildingDescription,
        // tslint:disable-next-line:quotemark
        // prettier-ignore
        buildingName: building.buildingName,
      },
    };
    this.store.dispatch(BuildingActions.update({ building: buildingUpdate }));
  }
}
