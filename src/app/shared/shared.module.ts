// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Prime
import { RippleModule as PrimeRippleModule } from 'primeng/ripple';
import { ButtonModule as PrimeButtonModule } from 'primeng/button';
import { AccordionModule as PrimeAccordionModule } from 'primeng/accordion';
// Components
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { OverviewPanelComponent } from './components/overview-panel/overview-panel.component';

@NgModule({
  declarations: [LeftNavComponent, OverviewPanelComponent],
  imports: [
    // Angular Modules
    CommonModule,
    RouterModule,
    // Prime Modules
    PrimeRippleModule,
    PrimeButtonModule,
    PrimeAccordionModule,
  ],
  exports: [
    // Components
    LeftNavComponent,
    OverviewPanelComponent,
  ],
  providers: [],
})
export class SharedModule {}
