import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InteriorLayoutComponent } from './shared/layouts/interior-layout/interior-layout.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'map',
  },

  {
    path: '',
    component: InteriorLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
      },
    ],
  },
  {
    path: 'style-guide',
    component: StyleGuideComponent,
    loadChildren: () =>
      import('./style-guide/style-guide.module').then(
        (m) => m.StyleGuideModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
