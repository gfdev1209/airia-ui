import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ReportFormViewComponent } from './views/report-form-view/report-form-view.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { ReportLayoutComponent } from './layouts/report-layout/report-layout.component';

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
  ],
  exports: [],
  providers: [],
})
export class ReportModule {}
