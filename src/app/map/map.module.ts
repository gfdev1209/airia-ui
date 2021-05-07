import { NgModule } from '@angular/core';
import { MapComponent } from './pages/map/map.component';
import { RouterModule, Routes } from '@angular/router';
import { OverviewPanelComponent } from './components/overview-panel/overview-panel.component';
import { OverviewPanelViewComponent } from './views/overview-panel-view/overview-panel-view.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapLayoutComponent } from './layouts/map-layout/map-layout.component';

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
  ],
})
export class MapModule {}
