// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TagModule as PrimeTagModule } from 'primeng/tag';
import { MultiSelectModule as PrimeMultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule as PrimeContextMenuModule } from 'primeng/contextmenu';
import { ProgressSpinnerModule as PrimeProgressSpinnerModule } from 'primeng/progressspinner';
import { InputMaskModule as PrimeInputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule as PrimeConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule as PrimeDynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule as PrimeDialogModule } from 'primeng/dialog';
import { TabViewModule as PrimeTabViewModule } from 'primeng/tabview';
import { TooltipModule as PrimeTooltipModule } from 'primeng/tooltip';
import { ToastModule as PrimeToastModule } from 'primeng/toast';
import { InputNumberModule as PrimeInputNumberModule } from 'primeng/inputnumber';

// Components
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { InteriorLayoutComponent } from './layouts/interior-layout/interior-layout.component';
import { AlertIconByTypePipe } from './pipes/alert-icon-by-type.pipe';
import { ColorByAlertSeverityPipe } from './pipes/color-by-alert-severity.pipe';
import { UnderscoreToSpacePipe } from './pipes/underscore-to-space.pipe';
import { EnumToSelectItemsPipe } from './pipes/enum-to-select-items.pipe';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { InteriorNavComponent } from './components/interior-nav/interior-nav.component';
import { UserSearchInputComponent } from './components/user-search-input/user-search-input.component';
import { UserSearchInputViewComponent } from './views/user-search-input-view/user-search-input-view.component';
import { BlockChartItemViewComponent } from './views/block-chart-item-view/block-chart-item-view.component';
import { BlockChartViewComponent } from './views/block-chart-view/block-chart-view.component';
import { AlertTableComponent } from './components/alert-table/alert-table.component';
import { AlertTableViewComponent } from './views/alert-table-view/alert-table-view.component';
import { AccessPointTableComponent } from './components/access-point-table/access-point-table.component';
import { AccessPointTableViewComponent } from './views/access-point-table-view/access-point-table-view.component';
import { AccessPointFormComponent } from './components/access-point-form/access-point-form.component';
import { AccessPointFormViewComponent } from './views/access-point-form-view/access-point-form-view.component';
import { BuildingSearchInputComponent } from './components/building-search-input/building-search-input.component';
import { BuildingSearchInputViewComponent } from './views/building-search-input-view/building-search-input-view.component';
import { FloorTableComponent } from './components/floor-table/floor-table.component';
import { FloorTableViewComponent } from './views/floor-table-view/floor-table-view.component';
import { FloorFormComponent } from './components/floor-form/floor-form.component';
import { FloorFormViewComponent } from './views/floor-form-view/floor-form-view.component';
import { AccessPointSearchInputComponent } from './components/access-point-search-input/access-point-search-input.component';
import { AccessPointSearchInputViewComponent } from './views/access-point-search-input-view/access-point-search-input-view.component';
// Components

@NgModule({
  declarations: [
    // Components
    InteriorLayoutComponent,
    LeftNavComponent,
    InteriorNavComponent,
    UserSearchInputComponent,
    UserSearchInputViewComponent,
    BuildingSearchInputComponent,
    BuildingSearchInputViewComponent,
    BlockChartViewComponent,
    BlockChartItemViewComponent,
    AlertTableComponent,
    AlertTableViewComponent,
    AccessPointTableComponent,
    AccessPointTableViewComponent,
    AccessPointFormComponent,
    AccessPointFormViewComponent,
    AccessPointSearchInputComponent,
    AccessPointSearchInputViewComponent,
    FloorTableComponent,
    FloorTableViewComponent,
    FloorFormComponent,
    FloorFormViewComponent,
    // Pipes
    AlertIconByTypePipe,
    ColorByAlertSeverityPipe,
    UnderscoreToSpacePipe,
    EnumToSelectItemsPipe,
    EnumToArrayPipe,
  ],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    PrimeMultiSelectModule,
    PrimeTagModule,
    PrimeContextMenuModule,
    PrimeProgressSpinnerModule,
    PrimeInputMaskModule,
    PrimeDialogModule,
    PrimeConfirmDialogModule,
    PrimeDynamicDialogModule,
    PrimeTabViewModule,
    PrimeTooltipModule,
    PrimeToastModule,
    PrimeInputNumberModule,
  ],
  exports: [
    // Components
    LeftNavComponent,
    InteriorNavComponent,
    UserSearchInputComponent,
    BlockChartViewComponent,
    BlockChartItemViewComponent,
    AlertTableComponent,
    AlertTableViewComponent,
    AccessPointTableComponent,
    AccessPointFormComponent,
    AccessPointSearchInputComponent,
    BuildingSearchInputComponent,
    FloorTableComponent,
    FloorFormComponent,
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
    PrimeMultiSelectModule,
    PrimeProgressSpinnerModule,
    PrimeTagModule,
    PrimeContextMenuModule,
    PrimeInputMaskModule,
    PrimeDialogModule,
    PrimeConfirmDialogModule,
    PrimeDynamicDialogModule,
    PrimeTabViewModule,
    PrimeTooltipModule,
    PrimeToastModule,
    PrimeInputNumberModule,
    // Pipes
    AlertIconByTypePipe,
    ColorByAlertSeverityPipe,
    UnderscoreToSpacePipe,
    EnumToSelectItemsPipe,
    EnumToArrayPipe,
  ],
  providers: [],
  entryComponents: [AccessPointFormComponent, FloorFormComponent],
})
export class SharedModule {}
