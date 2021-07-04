import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, Role, User } from '@map/models';

@Component({
  selector: 'app-user-form-view',
  templateUrl: './user-form-view.component.html',
  styleUrls: ['./user-form-view.component.scss'],
})
export class UserFormViewComponent implements OnInit, OnChanges {
  @Input() user?: User | null;
  @Input() departments?: Department[] | null;
  @Input() roles?: Role[] | null;

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && !changes.user.firstChange) {
      this.userForm.patchValue(changes.user.currentValue);
    }
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [
        this.user?.phone,
        [Validators.required, Validators.minLength(12)],
      ],
    });
  }
}
