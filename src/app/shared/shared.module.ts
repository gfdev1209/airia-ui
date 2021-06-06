// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Prime
import { RippleModule as PrimeRippleModule } from 'primeng/ripple';
import { ButtonModule as PrimeButtonModule } from 'primeng/button';
import { InputTextModule as PrimeInputTextModule } from 'primeng/inputtext';
import { AccordionModule as PrimeAccordionModule } from 'primeng/accordion';
import { InputSwitchModule as PrimeInputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule as PrimeDropdownModule } from 'primeng/dropdown';
import { CheckboxModule as PrimeCheckboxModule } from 'primeng/checkbox';
import { ScrollPanelModule as PrimeScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { VirtualScrollerModule as PrimeVirtualScrollerModule } from 'primeng/virtualscroller';
import { SkeletonModule as PrimeSkeletonModule } from 'primeng/skeleton';
import { PanelModule as PrimePanelModule } from 'primeng/panel';
import { CardModule as PrimeCardModule } from 'primeng/card';
import { MessageModule as PrimeMessageModule } from 'primeng/message';
import { MessagesModule as PrimeMessagesModule } from 'primeng/messages';
import { AutoCompleteModule as PrimeAutoCompleteModule } from 'primeng/autocomplete';
import { ChartModule as PrimeChartModule } from 'primeng/chart';
import { CalendarModule as PrimeCalendarModule } from 'primeng/calendar';

// Components
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { InteriorLayoutComponent } from './layouts/interior-layout/interior-layout.component';
import { AlertIconByTypePipe } from './pipes/alert-icon-by-type.pipe';
import { ColorByAlertSeverityPipe } from './pipes/color-by-alert-severity.pipe';
// Components

@NgModule({
  declarations: [
    InteriorLayoutComponent,
    LeftNavComponent,
    AlertIconByTypePipe,
    ColorByAlertSeverityPipe,
  ],
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
    PrimeScrollPanelModule,
    PrimeTableModule,
    PrimeVirtualScrollerModule,
    PrimeSkeletonModule,
    PrimePanelModule,
    PrimeCardModule,
    PrimeMessageModule,
    PrimeMessagesModule,
    PrimeChartModule,
    PrimeInputTextModule,
    PrimeAutoCompleteModule,
    PrimeCalendarModule,
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
    PrimeScrollPanelModule,
    PrimeTableModule,
    PrimeVirtualScrollerModule,
    PrimeSkeletonModule,
    PrimePanelModule,
    PrimeCardModule,
    PrimeMessageModule,
    PrimeMessagesModule,
    PrimeChartModule,
    PrimeInputTextModule,
    PrimeAutoCompleteModule,
    PrimeCalendarModule,
    // Pipes
    AlertIconByTypePipe,
    ColorByAlertSeverityPipe,
  ],
  providers: [],
})
export class SharedModule {}
