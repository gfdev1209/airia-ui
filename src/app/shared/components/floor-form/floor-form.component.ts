import { Component, OnDestroy, OnInit } from '@angular/core';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as FloorSelectors from '@store/floor/floor.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Floor } from '@map/models';
import { Update } from '@ngrx/entity';
import { tap } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-floor-form',
  templateUrl: './floor-form.component.html',
  styleUrls: ['./floor-form.component.scss'],
})
export class FloorFormComponent implements OnInit, OnDestroy {
  floor$ = this.store.select(FloorSelectors.selectSelectedFloor);
  loading$ = this.store.select(FloorSelectors.selectLoading);
  buildings$ = this.store.select(BuildingSelectors.selectAll);
  floors$ = this.store.select(FloorSelectors.selectAll);

  closeModal$ = new Subscription();

  constructor(
    private store: Store<RootState>,
    public ref: DynamicDialogRef,
    private actions: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.store.dispatch(FloorActions.getAll());
    this.closeModal$ = this.actions
      .pipe(ofType(FloorActions.closeFormModal))
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

  save(floor: Floor): void {
    const floorUpdate: Update<Floor> = {
      id: floor.id,
      changes: {
        floorId: floor.floorId,
        floorMaxOccupancy: floor.floorMaxOccupancy,
      },
    };
    this.store.dispatch(FloorActions.update({ floor: floorUpdate }));
  }
  ngOnDestroy(): void {
    this.closeModal$?.unsubscribe();
  }
}
