import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Building } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import * as RegionActions from '@store/region/region.actions';

@Component({
  selector: 'app-building-page',
  templateUrl: './building-page.component.html',
  styleUrls: ['./building-page.component.scss'],
})
export class BuildingPageComponent implements OnInit, OnDestroy {
  buildingSelected$?: Subscription;

  constructor(
    private store: Store<RootState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(RegionActions.deselect());
    this.store.dispatch(BuildingActions.deselect());
    this.buildingSelected$ = this.store
      .select(BuildingSelectors.selectSelectedBuilding)
      .pipe(tap((building) => this.buildingSelected(building)))
      .subscribe();
  }

  buildingSelected(building: Building | null): void {
    if (building) {
      this.router.navigate([`${building.id}`], { relativeTo: this.route });
    }
  }

  ngOnDestroy(): void {
    this.buildingSelected$?.unsubscribe();
  }
}
