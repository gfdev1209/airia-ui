import { Component, OnInit } from '@angular/core';
import { Floor } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as FloorSelectors from '@store/floor/floor.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import { DialogService } from 'primeng/dynamicdialog';
import { FloorFormComponent } from '../floor-form/floor-form.component';

@Component({
  selector: 'app-floor-table',
  templateUrl: './floor-table.component.html',
  styleUrls: ['./floor-table.component.scss'],
  providers: [DialogService],
})
export class FloorTableComponent implements OnInit {
  floors$ = this.store.select(FloorSelectors.selectAll);

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
}
