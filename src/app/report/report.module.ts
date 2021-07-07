import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ReportFormViewComponent } from './views/report-form-view/report-form-view.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { ReportLayoutComponent } from './layouts/report-layout/report-layout.component';
import { AlertTableComponent } from './components/alert-table/alert-table.component';
import { AlertTableViewComponent } from './views/alert-table-view/alert-table-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    ReportLayoutComponent,
    ReportFormComponent,
    ReportFormViewComponent,
    AlertTableComponent,
    AlertTableViewComponent,
  ],
  exports: [],
  providers: [],
})
export class ReportModule {}
