import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './login/components/login/login.component';
import { MapLayoutComponent } from './map/layouts/map-layout/map-layout.component';
import { ReportLayoutComponent } from './report/layouts/report-layout/report-layout.component';
import { InteriorLayoutComponent } from './shared/layouts/interior-layout/interior-layout.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'map',
    component: InteriorLayoutComponent,
    children: [
      {
        path: '',
        component: MapLayoutComponent,
        loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
      },
    ],
    canActivate: [MsalGuard],
  },
  {
    path: 'report',
    component: InteriorLayoutComponent,
    children: [
      {
        path: '',
        component: ReportLayoutComponent,
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
      },
    ],
    canActivate: [MsalGuard],
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

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      // Don't perform initial navigation in iframes
      initialNavigation: !isIframe ? 'enabled' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
