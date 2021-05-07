// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Prime
import { RippleModule as PrimeRippleModule } from 'primeng/ripple';
import { ButtonModule as PrimeButtonModule } from 'primeng/button';
import { AccordionModule as PrimeAccordionModule } from 'primeng/accordion';
import { InputSwitchModule as PrimeInputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule as PrimeDropdownModule } from 'primeng/dropdown';
import { CheckboxModule as PrimeCheckboxModule } from 'primeng/checkbox';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { InteriorLayoutComponent } from './layouts/interior-layout/interior-layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Components

@NgModule({
  declarations: [InteriorLayoutComponent, LeftNavComponent, LeftMenuComponent],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    RouterModule,
    // Prime Modules
    PrimeRippleModule,
    PrimeButtonModule,
    PrimeAccordionModule,
    PrimeInputSwitchModule,
    PrimeDropdownModule,
    PrimeCheckboxModule,
  ],
  exports: [
    // Components
    LeftNavComponent,
    // Prime Modules
    PrimeRippleModule,
    PrimeButtonModule,
    PrimeAccordionModule,
    PrimeInputSwitchModule,
    PrimeDropdownModule,
    PrimeCheckboxModule,
  ],
  providers: [],
})
export class SharedModule {}
