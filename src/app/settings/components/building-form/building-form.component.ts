import { Component, OnInit } from '@angular/core';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import * as FloorSelectors from '@store/floor/floor.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { Building } from '@map/models';
import { Update } from '@ngrx/entity';
import { DialogService } from 'primeng/dynamicdialog';
import { FloorFormComponent } from '@shared/components/floor-form/floor-form.component';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.scss'],
  providers: [DialogService],
})
export class BuildingFormComponent implements OnInit {
  building$ = this.store.select(BuildingSelectors.selectSelectedBuilding).pipe(
    tap((building) => {
      if (!building && this.buildingId) {
        this.store.dispatch(BuildingActions.select({ id: +this.buildingId }));
      }
    })
  );
  floors$ = this.store.select(FloorSelectors.selectAll);
  loading$ = this.store.select(BuildingSelectors.selectLoading);

  buildingId?: string | null;

  constructor(
    private store: Store<RootState>,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.buildingId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(FloorActions.getAll());
  }

  updateBuilding(building: Building): void {
    const buildingUpdate: Update<Building> = {
      id: building.id,
      changes: {
        buildingClassification: building.buildingClassification,
        // tslint:disable-next-line:quotemark
        // prettier-ignore
        buildingDescription: building.buildingDescription,
        // tslint:disable-next-line:quotemark
        // prettier-ignore
        buildingName: building.buildingName,
      },
    };
    this.store.dispatch(BuildingActions.update({ building: buildingUpdate }));
  }
  addFloor(building: Building): void {
    if (building) {
      this.store.dispatch(FloorActions.deselect());
      const ref = this.dialogService.open(FloorFormComponent, {
        header: 'Add Floor',
      });
      ref.onClose.subscribe(() => {
        this.store.dispatch(FloorActions.deselect());
      });
    }
  }
  onEditShape(building: Building): void {
    this.store.dispatch(BuildingActions.editBuildingShape());
    this.router.navigate(['/map']);
  }
  onRemoveShape(building: Building): void {
    this.store.dispatch(
      BuildingActions.updateBuildingPolygon({
        id: building.id,
        polygon: undefined,
      })
    );
  }
}
