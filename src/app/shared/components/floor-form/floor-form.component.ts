import { Component, OnInit } from '@angular/core';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as FloorSelectors from '@store/floor/floor.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Floor } from '@map/models';

@Component({
  selector: 'app-floor-form',
  templateUrl: './floor-form.component.html',
  styleUrls: ['./floor-form.component.scss'],
})
export class FloorFormComponent implements OnInit {
  floor$ = this.store.select(FloorSelectors.selectSelectedFloor);
  buildings$ = this.store.select(BuildingSelectors.selectAll);
  floors$ = this.store.select(FloorSelectors.selectAll);

  constructor(private store: Store<RootState>, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.store.dispatch(FloorActions.getAll());
  }

  cancel(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  save(floor: Floor): void {
    console.log('save', floor);
  }
}
