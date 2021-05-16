import { NgModule } from '@angular/core';
import { MapComponent } from './pages/map/map.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    MapComponent,
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
  ],
})
export class MapModule {}
