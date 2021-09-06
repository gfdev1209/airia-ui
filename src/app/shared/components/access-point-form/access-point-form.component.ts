import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import * as AccessPointActions from '@store/access-point/access-point.actions';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as FloorSelectors from '@store/floor/floor.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccessPoint, Floor } from '@map/models';
import { Update } from '@ngrx/entity';
import { ofType } from '@ngrx/effects';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-access-point-form',
  templateUrl: './access-point-form.component.html',
  styleUrls: ['./access-point-form.component.scss'],
})
export class AccessPointFormComponent implements OnInit, OnDestroy {
  loading$ = this.store.select(AccessPointSelectors.selectLoading);
  buildings$ = this.store.select(BuildingSelectors.selectAll);

  floors$?: Observable<Floor[]>;
  accessPoint$ = this.store
    .select(AccessPointSelectors.selectSelectedAccessPoint)
    .pipe(
      tap((accessPoint) => {
        if (accessPoint) {
          this.accessPoint = accessPoint;
          this.floors$ = this.store.select(FloorSelectors.selectByBuildingId, {
            buildingId: accessPoint.floor?.buildingId,
          });
        }
      })
    )
    .subscribe();
  accessPoint?: AccessPoint;

  closeModal$ = new Subscription();

  constructor(
    private store: Store<RootState>,
    public ref: DynamicDialogRef,
    private actions: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.store.dispatch(FloorActions.getAll());
    this.closeModal$ = this.actions
      .pipe(ofType(AccessPointActions.closeFormModal))
      .subscribe(() => {
        this.closeModal();
      });
  }

  cancel(): void {
    this.closeModal();
  }

  closeModal(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  save(accessPoint: AccessPoint): void {
    const accessPointUpdate: Update<any> = {
      id: accessPoint.id,
      changes: {
        accessPointName: accessPoint.name,
        buildingFloorId: accessPoint.floorId,
      },
    };
    this.store.dispatch(
      AccessPointActions.update({ accessPoint: accessPointUpdate })
    );
  }

  ngOnDestroy(): void {
    this.accessPoint$?.unsubscribe();
    this.closeModal$?.unsubscribe();
  }
}
