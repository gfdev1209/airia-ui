import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as FloorSelectors from '@store/floor/floor.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccessPoint } from '@map/models';

@Component({
  selector: 'app-access-point-form',
  templateUrl: './access-point-form.component.html',
  styleUrls: ['./access-point-form.component.scss'],
})
export class AccessPointFormComponent implements OnInit {
  accessPoint$ = this.store.select(
    AccessPointSelectors.selectSelectedAccessPoint
  );
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

  save(accessPoint: AccessPoint): void {
    console.log('save', accessPoint);
  }
}
