import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SettingsMenuViewComponent } from './views/settings-menu-view/settings-menu-view.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersTableViewComponent } from './views/users-table-view/users-table-view.component';
import { UserSearchInputComponent } from './components/user-search-input/user-search-input.component';
import { UserSearchInputViewComponent } from './views/user-search-input-view/user-search-input-view.component';

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
    UsersTableComponent,
    UsersTableViewComponent,
    UserSearchInputComponent,
    UserSearchInputViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [UserSearchInputComponent],
  providers: [],
})
export class SettingsModule {}
