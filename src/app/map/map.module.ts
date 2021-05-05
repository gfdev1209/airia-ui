import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './pages/map/map.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'map',
    component: MapComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [MapComponent],
})
export class MapModule {}
