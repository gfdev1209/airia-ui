import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { ChartModule } from 'primeng/chart';

import { StyleGuideComponent } from './style-guide.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    PanelModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    ChartModule,
    ScrollPanelModule,
  ],
  declarations: [StyleGuideComponent],
})
export class StyleGuideModule {}
