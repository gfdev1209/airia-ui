// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Prime
import { RippleModule as PrimeRippleModule } from 'primeng/ripple';
import { ButtonModule as PrimeButtonModule } from 'primeng/button';
// Components
import { LeftNavComponent } from './components/left-nav/left-nav.component';

@NgModule({
  declarations: [LeftNavComponent],
  imports: [
    // Angular Modules
    CommonModule,
    RouterModule,
    // Prime Modules
    PrimeRippleModule,
    PrimeButtonModule,
  ],
  exports: [
    // Prime Modules
    PrimeButtonModule,
    PrimeRippleModule,
    // Components
    LeftNavComponent,
  ],
  providers: [],
})
export class SharedModule {}
