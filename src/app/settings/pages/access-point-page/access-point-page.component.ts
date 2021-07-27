import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessPoint } from '@map/models';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as AccessPointActions from '@store/access-point/access-point.actions';
import * as AccessPointSelectors from '@store/access-point/access-point.selectors';
import { DialogService } from 'primeng/dynamicdialog';
import { AccessPointFormComponent } from '@shared/components/access-point-form/access-point-form.component';

@Component({
  selector: 'app-access-point-page',
  templateUrl: './access-point-page.component.html',
  styleUrls: ['./access-point-page.component.scss'],
  providers: [DialogService],
})
export class AccessPointPageComponent implements OnInit, OnDestroy {
  accessPointSelected$?: Subscription;

  constructor(
    private store: Store<RootState>,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AccessPointActions.deselect());
    this.accessPointSelected$ = this.store
      .select(AccessPointSelectors.selectSelectedAccessPoint)
      .pipe(tap((accessPoint) => this.accessPointSelected(accessPoint)))
      .subscribe();
  }

  accessPointSelected(accessPoint: AccessPoint | null | undefined): void {
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

  ngOnDestroy(): void {
    this.accessPointSelected$?.unsubscribe();
  }
}
