import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import * as AccessPointActions from '@store/access-point/access-point.actions';
import * as BuildingSelectors from '@store/building/building.selectors';
import { Input } from '@angular/core';
import { AccessPoint, Building } from '@map/models';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccessPointFormComponent } from '@shared/components/access-point-form/access-point-form.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-building-details-access-points',
  templateUrl: './building-details-access-points.component.html',
  styleUrls: ['./building-details-access-points.component.scss'],
  providers: [DialogService],
})
export class BuildingDetailsAccessPointsComponent implements OnInit, OnDestroy {
  accessPoints$?: Observable<AccessPoint[]>;
  accessPointSelected$?: Subscription;

  building$ = this.store.select(BuildingSelectors.selectSelectedBuilding).pipe(
    tap((building) => {
      if (building) {
        const buildingId = building.id;
        this.accessPoints$ = this.store.select(
          AccessPointSelectors.selectByBuildingId,
          {
            buildingId,
          }
        );
      }
    })
  );

  constructor(
    private store: Store<RootState>,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AccessPointActions.getAll());
    this.accessPointSelected$ = this.store
      .select(AccessPointSelectors.selectSelectedAccessPoint)
      .pipe(tap((accessPoint) => this.accessPointSelected(accessPoint)))
      .subscribe();
  }
  accessPointSelected(accessPoint: AccessPoint | null | undefined): void {
    if (accessPoint) {
      this.store.dispatch(AccessPointActions.select({ id: accessPoint.id }));
      const ref = this.dialogService.open(AccessPointFormComponent, {
        header: 'Edit Access Point',
      });
      ref.onClose.subscribe(() => {
        this.store.dispatch(AccessPointActions.deselect());
      });
    }
  }

  ngOnDestroy(): void {
    this.accessPointSelected$?.unsubscribe();
  }
}
