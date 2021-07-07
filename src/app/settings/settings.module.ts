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

export const routes: Routes = [
  {
    path: 'settings',
    component: SettingsLayoutComponent,
    children: [
      { path: 'users', component: UsersPageComponent },
      { path: 'users/:id', component: UserFormComponent },
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
