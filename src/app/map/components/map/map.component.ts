import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as BuildingSelectors from './../../../store/building/building.selectors';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  selectedBuilding$ = this.store.select(
    BuildingSelectors.selectSelectedBuilding
  );

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}
}
