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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchBarViewComponent } from './views/search-bar-view/search-bar-view.component';
import { MapComponent } from './components/map/map.component';
import { MapViewComponent } from './views/map-view/map-view.component';
import { BuildingOverviewComponent } from './components/building-overview/building-overview.component';
import { BuildingOverviewViewComponent } from './views/building-overview-view/building-overview-view.component';
import { ZoomControlsComponent } from './components/zoom-controls/zoom-controls.component';
import { ZoomControlsViewComponent } from './views/zoom-controls-view/zoom-controls-view.component';

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
    SearchBarComponent,
    SearchBarViewComponent,
    BuildingOverviewComponent,
    BuildingOverviewViewComponent,
    ZoomControlsComponent,
    ZoomControlsViewComponent,
  ],
})
export class MapModule {}
