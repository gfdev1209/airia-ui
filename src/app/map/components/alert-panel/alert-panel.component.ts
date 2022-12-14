import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { MapService } from '@map/services/map.service';
import * as AlertSelectors from '@store/alert/alert.selectors';
import * as UserSelectors from '@store/user/user.selectors';
import * as AlertActions from '@store/alert/alert.actions';
import * as BuildingSelectors from '@store/building/building.selectors';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.scss'],
})
export class AlertPanelComponent implements OnInit {
  @Input() knobValue!: number;
  overviewPanelHeight$ = this.mapService.overviewPanelHeight$;
  alerts$ = this.store.select(AlertSelectors.selectAll);
  selectedBuilding$ = this.store.select(
    BuildingSelectors.selectSelectedBuilding
  );
  selectedAlert$ = this.store.select(AlertSelectors.selectSelectedAlert);
  alertSortType$ = this.store.select(AlertSelectors.selectSortType);
  alertSortDirection$ = this.store.select(AlertSelectors.selectSortDirection);
  pinnedAlerts$ = this.store.select(AlertSelectors.selectPinnedAlerts);
  self$ = this.store.select(UserSelectors.selectSelf);

  showSevereUrgency = true;
  showHighUrgency = true;
  showMediumUrgency = true;
  showLowUrgency = true;
  showAcknowledged = true;
  showNetworkHealth = true;
  showAPStatus = true;
  showCapacity = true;
  selfSubscription: Subscription | undefined;
  constructor(
    private store: Store<RootState>,
    private mapService: MapService, 

  ) {}

  ngOnInit(): void {
   this.selfSubscription = this.self$.subscribe(res=>{
      let pinnedAlertsIDs= res?.userPreferences?.pinnedAlertIds?.$values;
      if(pinnedAlertsIDs?.length){
        let ids:string = pinnedAlertsIDs?.join("&ids=");
        this.store.dispatch(
          AlertActions.getPinnedAlerts({ids})
      );
       
      }
    });
  

    this.store.dispatch(
      AlertActions.skipAndTakeAlertTable({
        skipTakeInput: {
          skip: 0,
          take: 100,
          parameters: { sortField: 'alertEndTime', sortOrder: -1 },
        },
      })
    );
  }


  onToggleSevereUrgency($event: any): void {
    this.showSevereUrgency = $event.checked;
  }
  onToggleHighUrgency($event: any): void {
    this.showHighUrgency = $event.checked;
  }
  onToggleMediumUrgency($event: any): void {
    this.showMediumUrgency = $event.checked;
  }
  onToggleLowUrgency($event: any): void {
    this.showLowUrgency = $event.checked;
  }
  onToggleAcknowledged($event: any): void {
    this.showAcknowledged = $event.checked;
  }
  onToggleNetworkHealth($event: any): void {
    this.showNetworkHealth = $event.checked;
  }
  onToggleShowAPStatus($event: any): void {
    this.showAPStatus = $event.checked;
  }
  onToggleShowCapacity($event: any): void {
    this.showCapacity = $event.checked;
  }

  ngOnDestroy(){
    this.selfSubscription?.unsubscribe();
  }

}
