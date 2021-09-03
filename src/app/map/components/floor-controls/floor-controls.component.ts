import { Component, OnInit } from '@angular/core';
import { Floor } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as FloorActions from '@store/floor/floor.actions';
import * as FloorSelectors from '@store/floor/floor.selectors';

@Component({
  selector: 'app-floor-controls',
  templateUrl: './floor-controls.component.html',
  styleUrls: ['./floor-controls.component.scss'],
})
export class FloorControlsComponent implements OnInit {
  floors$ = this.store.select(FloorSelectors.selectAllUnique);
  selectedFloorNumber$ = this.store.select(
    FloorSelectors.selectSelectedFloorNumber
  );
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  onSelectFloor(floorNumber: number): void {
    this.store.dispatch(FloorActions.selectFloorNumber({ floorNumber }));
  }
  onDeselectFloor(floorNumber: number): void {
    this.store.dispatch(FloorActions.deselectFloorNumber());
  }
}
