import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SettingsMenuViewComponent } from './views/settings-menu-view/settings-menu-view.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersTableViewComponent } from './views/users-table-view/users-table-view.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserFormViewComponent } from './views/user-form-view/user-form-view.component';
import { BuildingPageComponent } from './pages/building-page/building-page.component';
import { BuildingsTableComponent } from './components/buildings-table/buildings-table.component';
import { BuildingsTableViewComponent } from './views/buildings-table-view/buildings-table-view.component';
import { BuildingFormComponent } from './components/building-form/building-form.component';
import { BuildingFormViewComponent } from './views/building-form-view/building-form-view.component';
import { AccessPointPageComponent } from './pages/access-point-page/access-point-page.component';

export const routes: Routes = [
  {
    path: 'settings',
    component: SettingsLayoutComponent,
    children: [
      { path: 'users', component: UsersPageComponent },
      { path: 'users/:id', component: UserFormComponent },
      { path: 'buildings', component: BuildingPageComponent },
      { path: 'buildings/:id', component: BuildingFormComponent },
      { path: 'access-points', component: AccessPointPageComponent },
    ],
  },
];

@NgModule({
  declarations: [
    SettingsLayoutComponent,
    SettingsMenuViewComponent,
    UsersPageComponent,
    UsersTableComponent,
    UsersTableViewComponent,
    UserFormComponent,
    UserFormViewComponent,
    BuildingPageComponent,
    BuildingsTableComponent,
    BuildingsTableViewComponent,
    BuildingFormComponent,
    BuildingFormViewComponent,
    AccessPointPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: [],
})
export class SettingsModule {}
