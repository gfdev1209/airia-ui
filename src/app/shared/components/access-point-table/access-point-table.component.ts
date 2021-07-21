import { Component, Input, OnInit } from '@angular/core';
import { Building, Alert } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { Observable } from 'rxjs';

import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import * as AccessPointActions from '@store/access-point/access-point.actions';

@Component({
  selector: 'app-access-point-table',
  templateUrl: './access-point-table.component.html',
  styleUrls: ['./access-point-table.component.scss'],
})
export class AccessPointTableComponent implements OnInit {
  @Input() showCheckboxColumn = true;
  @Input() building?: Building | null;

  accessPoints$ = this.store.select(AccessPointSelectors.selectAll);

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    if (!this.building) {
      this.store.dispatch(AccessPointActions.getAll());
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
}
