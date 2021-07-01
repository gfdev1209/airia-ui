import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SettingsMenuViewComponent } from './views/settings-menu-view/settings-menu-view.component';

@NgModule({
  declarations: [SettingsLayoutComponent, SettingsMenuViewComponent],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [],
  providers: [],
})
export class SettingsModule {}
