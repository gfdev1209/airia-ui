import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { MapService } from '../../services/map.service';
import * as AlertSelectors from '../../../store/alert/alert.selectors';
import * as AlertActions from '../../../store/alert/alert.actions';

@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.scss'],
})
export class AlertPanelComponent implements OnInit {
  overviewPanelHeight$ = this.mapService.overviewPanelHeight$;
  alerts$ = this.store.select(AlertSelectors.selectAll);
  alertSortType$ = this.store.select(AlertSelectors.selectSortType);

  constructor(
    private store: Store<RootState>,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AlertActions.getAll());
  }
}
