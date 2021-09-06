import { Component, OnDestroy, OnInit } from '@angular/core';
import { Floor } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as FloorSelectors from '@store/floor/floor.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuldingActions from '@store/building/building.actions';
import { DialogService } from 'primeng/dynamicdialog';
import { FloorFormComponent } from '../floor-form/floor-form.component';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-floor-table',
  templateUrl: './floor-table.component.html',
  styleUrls: ['./floor-table.component.scss'],
  providers: [DialogService],
})
export class FloorTableComponent implements OnInit, OnDestroy {
  floors$?: Observable<Floor[]>;
  building$ = this.store
    .select(BuildingSelectors.selectSelectedBuilding)
    .pipe(
      tap((building) => {
        if (building) {
          this.floors$ = this.store.select(FloorSelectors.selectByBuildingId, {
            buildingId: building.id,
          });
        } else {
          this.floors$ = this.store.select(FloorSelectors.selectAll);
        }
      })
    )
    .subscribe();

  constructor(
    private store: Store<RootState>,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(FloorActions.getAll());
  }

  selectFloor(floor: Floor): void {
    if (floor) {
      this.store.dispatch(FloorActions.selectFromTable({ id: floor.id }));
      const ref = this.dialogService.open(FloorFormComponent, {
        header: 'Edit Floor',
      });
      ref.onClose.subscribe(() => {
        this.store.dispatch(FloorActions.deselectFromTable());
      });
    }
  }
  deleteFloor(floor: Floor): void {}

  ngOnDestroy(): void {
    this.building$?.unsubscribe();
  }
}
