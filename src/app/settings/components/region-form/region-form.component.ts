import { Component, OnDestroy, OnInit } from '@angular/core';
import * as RegionSelectors from '@store/region/region.selectors';
import * as RegionActions from '@store/region/region.actions';
import * as FloorSelectors from '@store/floor/floor.selectors';
import * as BuildingSelectors from '@store/building/building.selectors';
import * as BuildingActions from '@store/building/building.actions';
import * as FloorActions from '@store/floor/floor.actions';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { Region } from '@map/models';
import { Update } from '@ngrx/entity';
import { DialogService } from 'primeng/dynamicdialog';
import { FloorFormComponent } from '@shared/components/floor-form/floor-form.component';
import { Actions, ofType } from '@ngrx/effects';
import { NotificationService } from '@shared/services/notification.service';

@Component({
    selector: 'app-region-form',
    templateUrl: './region-form.component.html',
    styleUrls: ['./region-form.component.scss'],
    providers: [DialogService],
})
export class RegionFormComponent implements OnInit, OnDestroy {
    region$ = this.store.select(RegionSelectors.selectSelectedRegion).pipe(
        tap((region) => {
            if (!region && this.regionId) {
                this.store.dispatch(RegionActions.select({ id: +this.regionId }));
            } else if (region?.buildingFloor) {
                this.onChangeBuilding(region?.buildingFloor?.buildingId);
            }
        })
    );
    floors$ = this.store.select(FloorSelectors.selectAll);
    buildings$ = this.store.select(BuildingSelectors.selectAll).pipe(
        tap((buildings) => {
            if (!buildings || buildings.length === 0) {
                this.store.dispatch(BuildingActions.getAll());
            }
        })
    );
    loading$ = this.store.select(RegionSelectors.selectLoading);
    addRegionSuccess$ = this.actions$.pipe(ofType(RegionActions.addSuccess)).subscribe((data: any) => {
        this.notificationService.displaySuccess('Successfully created Region');
        this.router.navigate(['/settings/region/' + data.id]);
    });
    updateRegionSuccess$ = this.actions$.pipe(ofType(RegionActions.updateSuccess)).subscribe((data: any) => {
        this.notificationService.displaySuccess('Successfully updated Region');
    });

    regionId?: string | null;

    constructor(
        private actions$: Actions,
        private store: Store<RootState>,
        private route: ActivatedRoute,
        private router: Router,
        private dialogService: DialogService,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.regionId = this.route.snapshot.paramMap.get('id');
        this.store.dispatch(FloorActions.getAll());
    }

    addRegion(region: Region): void {
        this.store.dispatch(RegionActions.add({ region }));
    }

    updateRegion(region: Region): void {
        const regionUpdate: Update<Region> = {
            id: region.id,
            changes: {
                regionId: region.id,
                regionName: region.regionName,
                buildingFloorId: region.buildingFloorId,
                buildingId: region.buildingId,
            },
        };
        this.store.dispatch(RegionActions.update({ region: regionUpdate }));
    }
    addFloor(region: Region): void {
        if (region) {
            this.store.dispatch(FloorActions.deselect());
            const ref = this.dialogService.open(FloorFormComponent, {
                header: 'Add Floor',
            });
            ref.onClose.subscribe(() => {
                this.store.dispatch(FloorActions.deselect());
            });
        }
    }
    onChangeBuilding(buildingId: number): void {
        this.floors$ = this.store.select(FloorSelectors.selectByBuildingId, {
            buildingId,
        });
    }
    onEditShape(region: Region): void {
        this.store.dispatch(RegionActions.editRegionShape());
        this.router.navigate(['/map']);
    }
    onRemoveShape(region: Region): void {
        this.store.dispatch(
            RegionActions.updateRegionPolygon({
                id: region.id,
                polygon: undefined,
            })
        );
    }
    ngOnDestroy(): void {
        this.updateRegionSuccess$?.unsubscribe();
    }
}
