import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import * as LocationActions from '@store/location/location.actions';
import * as LocationSelectors from '@store/location/location.selectors';
import { filter, tap } from 'rxjs/operators';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  AuthenticationResult,
} from '@azure/msal-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  locations$ = this.store.select(LocationSelectors.selectAll).pipe(
    tap((locations) => {
      if (locations?.length > 0) {
        this.store.dispatch(LocationActions.select({ id: locations[0].id }));
        this.store.dispatch(BuildingActions.getAll());
      }
    })
  );
  selectedLocation$ = this.store.select(
    LocationSelectors.selectSelectedLocation
  );
  buildings$ = this.store.select(BuildingSelectors.selectAll);
  selectedBuilding$ = this.store.select(
    BuildingSelectors.selectSelectedBuilding
  );
  showBuildingOverview$ = this.store.select(
    BuildingSelectors.selectShowOverview
  );

  constructor(
    private store: Store<RootState>,
    private authService: MsalService
  ) {
    this.store.dispatch(LocationActions.getAll());
  }

  ngOnInit(): void {
    console.log(this.authService.instance.getAllAccounts());
  }

  flyToBuildingComplete(): void {
    this.store.dispatch(BuildingActions.showOverview());
  }
  clickedBuildingId(mapboxId: number): void {
    this.store.dispatch(BuildingActions.selectByMapboxId({ mapboxId }));
  }
}
