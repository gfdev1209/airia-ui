import { Component, OnInit } from '@angular/core';
import * as RegionSelectors from '@store/region/region.selectors';
import * as RegionActions from '@store/region/region.actions';
import * as UserSelectors from '@store/user/user.selectors';
import { Region } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

@Component({
    selector: 'app-regions-table',
    templateUrl: './regions-table.component.html',
    styleUrls: ['./regions-table.component.scss'],
})
export class RegionsTableComponent implements OnInit {
    regions$ = this.store.select(RegionSelectors.selectAll);
    self$ = this.store.select(UserSelectors.selectSelf);
    loading$ = this.store.select(RegionSelectors.selectLoading);

    constructor(private store: Store<RootState>) {}

    ngOnInit(): void {
        this.store.dispatch(RegionActions.getAll());
    }

    onDeleteRegion(region: Region): void {
        this.store.dispatch(RegionActions.remove({ id: region.id }));
    }

    regionSelected(region: Region): void {
        this.store.dispatch(RegionActions.select({ id: region.id }));
    }
}
