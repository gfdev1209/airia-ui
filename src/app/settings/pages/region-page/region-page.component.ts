import { Component, OnDestroy, OnInit } from '@angular/core';
import * as UserSelectors from '@store/user/user.selectors';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import AccessLevels from '@core/utils/access-levels';
import { Region, User } from '@map/models';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import * as RegionSelectors from '@store/region/region.selectors';
import * as RegionActions from '@store/region/region.actions';
import * as BuildingActions from '@store/building/building.actions';

@Component({
    selector: 'app-region-page',
    templateUrl: './region-page.component.html',
    styleUrls: ['./region-page.component.scss'],
})
export class RegionPageComponent implements OnInit, OnDestroy {
    self$ = this.store
        .select(UserSelectors.selectSelf)
        .pipe(tap((user) => (this.self = user)))
        .subscribe();
    self?: User | null;
    regionSelected$?: Subscription;

    constructor(private store: Store<RootState>, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.store.dispatch(RegionActions.deselect());
        this.store.dispatch(BuildingActions.deselect());
        this.regionSelected$ = this.store
            .select(RegionSelectors.selectSelectedRegion)
            .pipe(tap((region) => this.regionSelected(region)))
            .subscribe();
    }

    regionSelected(region: Region | null): void {
        if (region) {
            this.router.navigate([`/settings/region/${region.id}`], {
                relativeTo: this.route,
            });
        }
    }

    canEdit(): boolean {
        if (this.self?.role) {
            return AccessLevels.roleHasAccessLevel(this.self.role.name, AccessLevels.CanEdit);
        }
        return false;
    }
    ngOnDestroy(): void {
        this.self$?.unsubscribe();
        this.regionSelected$?.unsubscribe();
    }
}
