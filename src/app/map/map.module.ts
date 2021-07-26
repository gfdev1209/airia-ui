import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { MapLayoutComponent } from './layouts/map-layout/map-layout.component';
import { AlertPanelComponent } from './components/alert-panel/alert-panel.component';
import { AlertPanelViewComponent } from './views/alert-panel-view/alert-panel-view.component';
import { OverviewPanelComponent } from './components/overview-panel/overview-panel.component';
import { OverviewPanelViewComponent } from './views/overview-panel-view/overview-panel-view.component';
import { AlertPreviewComponent } from './components/alert-preview/alert-preview.component';
import { AlertPreviewViewComponent } from './views/alert-preview-view/alert-preview-view.component';
import { AlertDetailsComponent } from './components/alert-details/alert-details.component';
import { AlertDetailsViewComponent } from './views/alert-details-view/alert-details-view.component';
import { SearchBarViewComponent } from './views/search-bar-view/search-bar-view.component';
import { MapComponent } from './components/map/map.component';
import { MapViewComponent } from './views/map-view/map-view.component';
import { BuildingOverviewComponent } from './components/building-overview/building-overview.component';
import { BuildingOverviewViewComponent } from './views/building-overview-view/building-overview-view.component';
import { ZoomControlsComponent } from './components/zoom-controls/zoom-controls.component';
import { ZoomControlsViewComponent } from './views/zoom-controls-view/zoom-controls-view.component';
import { AccessPointOverviewComponent } from './components/access-point-overview/access-point-overview.component';
import { AccessPointOverviewViewComponent } from './views/access-point-overview-view/access-point-overview-view.component';
import { BuildingDetailsComponent } from './components/building-details/building-details.component';
import { BuildingDetailsViewComponent } from './views/building-details/building-details-view/building-details-view.component';
import { BuildingDetailsOccupancyViewComponent } from './views/building-details/building-details-occupancy-view/building-details-occupancy-view.component';
import { BuildingDetailsAlertsViewComponent } from './views/building-details/building-details-alerts-view/building-details-alerts-view.component';
import { BuildingDetailsAccessPointsViewComponent } from './views/building-details/building-details-access-points-view/building-details-access-points-view.component';
import { BuildingDetailsOccupancyComponent } from './components/building-details/building-details-occupancy/building-details-occupancy.component';
import { BuildingDetailsAlertsComponent } from './components/building-details/building-details-alerts/building-details-alerts.component';
import { BuildingDetailsAccessPointsComponent } from './components/building-details/building-details-access-points/building-details-access-points.component';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
    }),
  ],
  declarations: [
    MapComponent,
    MapViewComponent,
    MapLayoutComponent,
    OverviewPanelComponent,
    OverviewPanelViewComponent,
    AlertPanelComponent,
    AlertPanelViewComponent,
    AlertPreviewComponent,
    AlertPreviewViewComponent,
    AlertDetailsComponent,
    AlertDetailsViewComponent,
    SearchBarViewComponent,
    BuildingOverviewComponent,
    BuildingOverviewViewComponent,
    BuildingDetailsComponent,
    BuildingDetailsViewComponent,
    BuildingDetailsOccupancyComponent,
    BuildingDetailsOccupancyViewComponent,
    BuildingDetailsAlertsComponent,
    BuildingDetailsAlertsViewComponent,
    BuildingDetailsAccessPointsComponent,
    BuildingDetailsAccessPointsViewComponent,
    AccessPointOverviewComponent,
    AccessPointOverviewViewComponent,
    ZoomControlsComponent,
    ZoomControlsViewComponent,
  ],
})
export class MapModule {}
