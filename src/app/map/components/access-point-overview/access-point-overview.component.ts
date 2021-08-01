import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import * as AccessPointActions from '@store/access-point/access-point.actions';
import { AccessPoint } from '@map/models';
import { tap } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { AccessPointFormComponent } from '@shared/components/access-point-form/access-point-form.component';

@Component({
  selector: 'app-access-point-overview',
  templateUrl: './access-point-overview.component.html',
  styleUrls: ['./access-point-overview.component.scss'],
  providers: [DialogService],
})
export class AccessPointOverviewComponent {
  accessPoint$ = this.store
    .select(AccessPointSelectors.selectSelectedAccessPoint)
    .pipe(
      tap((accessPoint) => {
        if (accessPoint) {
          this.store.dispatch(AccessPointActions.get({ id: accessPoint.id }));
        }
      })
    );
  loading$ = this.store.select(AccessPointSelectors.selectLoading);

  constructor(
    private store: Store<RootState>,
    private dialogService: DialogService
  ) {}

  edit(accessPoint: AccessPoint): void {
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

  closePanel(): void {
    this.store.dispatch(AccessPointActions.deselect());
  }
}
