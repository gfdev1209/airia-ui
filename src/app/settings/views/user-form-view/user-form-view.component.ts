import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, Role, User, Location } from '@map/models';

@Component({
  selector: 'app-user-form-view',
  templateUrl: './user-form-view.component.html',
  styleUrls: ['./user-form-view.component.scss'],
})
export class UserFormViewComponent implements OnInit, OnChanges {
  @Input() user?: User | null;
  @Input() locations: Location[] = [];
  @Input() departments: Department[] = [];
  @Input() roles: Role[] = [];

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && !changes.user.firstChange) {
      this.userForm.patchValue(changes.user.currentValue);
      // this.userForm.controls.roles.patchValue(
      //   changes.user.currentValue.roles.id
      // );
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
      departmentId: [this.user?.departmentId, [Validators.required]],
      locations: ['', [Validators.required]],
      roleId: [this.user?.roleId, [Validators.required]],
    });
  }
}
