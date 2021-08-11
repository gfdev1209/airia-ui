import { EventEmitter, Input, Output } from '@angular/core';
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
  @Input() loading?: boolean | null;

  reportForm!: FormGroup;
  emailErrorMessage?: string;
  // emailArray: string[] = [];

  @Output() generateReport = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      title: ['', Validators.required],
      memo: [''],
      recipientEmailAddresses: [[], Validators.required],
      alertIds: [[]],
    });
  }

  userSelected(user: User): void {
    console.log('added', user);
    // this.reportForm.patchValue({ emails: user.email });
  }

  onAddEmail(event: any): void {
    const email = event?.value;
    if (email) {
      if (!this.validateEmail(event.value)) {
        this.emailErrorMessage = event.value + ' is not a valid email address'; // display error message
        this.reportForm.controls.recipientEmailAddresses.value.pop(); // remove last entry from values
        this.reportForm.controls.recipientEmailAddresses.updateValueAndValidity();
      } else {
        this.emailErrorMessage = undefined;
      }
    }
  }
  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onGenerateReport(): void {
    this.generateReport.emit(this.reportForm.value);
  }
}
