import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SettingsMenuViewComponent } from './views/settings-menu-view/settings-menu-view.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

export const routes: Routes = [
  {
    path: 'settings',
    component: SettingsLayoutComponent,
    children: [{ path: 'users', component: UsersPageComponent }],
  },
];

@NgModule({
  declarations: [
    SettingsLayoutComponent,
    SettingsMenuViewComponent,
    UsersPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: [],
})
export class SettingsModule {}
