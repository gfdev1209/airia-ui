import { Component, Input, OnInit } from '@angular/core';
import { Building, Alert, AccessPoint } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { Observable } from 'rxjs';

import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import * as AccessPointActions from '@store/access-point/access-point.actions';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import { DialogService } from 'primeng/dynamicdialog';
import { AccessPointFormComponent } from '../access-point-form/access-point-form.component';

@Component({
  selector: 'app-access-point-table',
  templateUrl: './access-point-table.component.html',
  styleUrls: ['./access-point-table.component.scss'],
  providers: [DialogService],
})
export class AccessPointTableComponent implements OnInit {
  @Input() showCheckboxColumn = true;
  @Input() building?: Building | null;

  buildings$ = this.store.select(BuildingSelectors.selectAll);
  accessPoints$ = this.store.select(AccessPointSelectors.selectAll);

  constructor(
    private store: Store<RootState>,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    if (!this.building) {
      this.store.dispatch(AccessPointActions.getAll());
      this.store.dispatch(BuildingActions.getAll());
      this.accessPoints$ = this.store.select(AccessPointSelectors.selectAll);
    } else {
      this.accessPoints$ = this.store.select(
        AccessPointSelectors.selectByBuildingId,
        {
          buildingId: this.building.id,
        }
      );
    }
  }

  onEditAccessPoint(accessPoint: AccessPoint): void {
    if (accessPoint) {
      this.store.dispatch(AccessPointActions.select({ id: accessPoint.id }));
    }
  }
}
