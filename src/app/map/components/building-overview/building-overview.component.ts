import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import * as FloorSelectors from '@store/floor/floor.selectors';
import * as FloorActions from '@store/floor/floor.actions';
import { tap } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { BuildingDetailsComponent } from '../building-details/building-details.component';
import { Building } from '@map/models';

@Component({
  selector: 'app-building-overview',
  templateUrl: './building-overview.component.html',
  styleUrls: ['./building-overview.component.scss'],
  providers: [DialogService],
})
export class BuildingOverviewComponent implements OnInit {
  building$ = this.store.select(BuildingSelectors.selectSelectedBuilding).pipe(
    tap((building) => {
      if (building) {
        this.building = building;
        this.store.dispatch(BuildingActions.get({ id: building.id }));
        this.store.dispatch(
          BuildingActions.getAnalytics({ buildingId: building.id })
        );
        // this.store.dispatch(
        //   FloorActions.getByBuildingId({ buildingId: building.id })
        // );
      }
    })
  );
  analytics$ = this.store.select(BuildingSelectors.selectAnalytics);
  show$ = this.store.select(BuildingSelectors.selectShowOverview);
  floors$ = this.store.select(FloorSelectors.selectAll);

  private building?: Building;

  constructor(
    private store: Store<RootState>,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  showDetails(show: boolean): void {
    if (show === true) {
      this.store.dispatch(BuildingActions.showDetails());
      // this.dialogService.open(BuildingDetailsComponent, {
      //   header: this.building ? this.building.buildingName : 'Building',
      //   dismissableMask: false,
      //   closable: true,
      //   modal: true,
      // });
    }
  }
  // *ngIf="building"
  // [header]="building ? building.buildingName : 'Building'"
  // [visible]="true"
  // [maximizable]="true"
  // [dismissableMask]="true"
  // [closable]="true"
  // styleClass="building-details-container"
  // position="top-left"
  // (onHide)="onHide()"

  closePanel(): void {
    this.store.dispatch(BuildingActions.deselect());
    this.store.dispatch(BuildingActions.hideOverview());
  }
}
