import { Component, OnInit } from '@angular/core';
import { Building, User } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';

@Component({
  selector: 'app-buildings-table',
  templateUrl: './buildings-table.component.html',
  styleUrls: ['./buildings-table.component.scss'],
})
export class BuildingsTableComponent implements OnInit {
  buildings$ = this.store.select(BuildingSelectors.selectAll);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(BuildingActions.getAll());
  }

  buildingSelected(building: Building): void {
    this.store.dispatch(BuildingActions.select({ id: building.id }));
  }
}
