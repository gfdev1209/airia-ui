import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@map/models';

@Component({
  selector: 'app-report-form-view',
  templateUrl: './report-form-view.component.html',
  styleUrls: ['./report-form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportFormViewComponent implements OnInit {
  reportForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      title: ['', Validators.required],
      emails: ['', Validators.required],
      memo: [''],
    });
  }

  userSelected(user: User): void {
    console.log('added', user);
    this.reportForm.patchValue({ emails: user.email });
  }
}
