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
  floors$ = this.store.select(FloorSelectors.selectAll);
  selectedFloor$ = this.store.select(FloorSelectors.selectSelectedFloor);
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  onSelectFloor(floor: Floor): void {
    this.store.dispatch(FloorActions.select({ id: floor?.id }));
  }
  onDeselectFloor(floor: Floor): void {
    this.store.dispatch(FloorActions.deselect());
  }
}
