import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, UserRole, User, Location } from '@map/models';


@Component({
  selector: 'app-user-form-view',
  templateUrl: './user-form-view.component.html',
  styleUrls: ['./user-form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormViewComponent implements OnInit, OnChanges {
  @Input() user?: User | null;
  @Input() locations: Location[] = [];
  @Input() departments: Department[] = [];
  @Input() roles: UserRole[] = [];
  @Output() roleUpdate = new EventEmitter();
  @Output() updateUser = new EventEmitter();

  userForm!: FormGroup;
  roleId:any;
  isformChanged = true;
  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && !changes.user.firstChange) {
      this.userForm.patchValue(changes.user.currentValue);
      // this.userForm.controls.roles.patchValue(
      //   changes.user.currentValue.roles.id
      // );
    }
    if (changes.roles && !changes.roles.firstChange) {
      let selected = this.user?.roleId || 0;
      let removed =  this.roles.splice((selected - 1),1);
      this.roles.unshift(removed[0]);
    }
  }
  isReady =false;
  ngOnInit(): void {  
    this.userForm = this.fb.group({
      id:[this.user?.id],
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [
        this.user?.phone,
        [Validators.required, Validators.minLength(10)],
      ],
      departmentId: [this.user?.departmentId, [Validators.required]],
      locations: [''],
      defaultLocation: [''],
      roleId: [this.user?.roleId, [Validators.required]],
    });
  }

  saveUser(){
    let form = this.userForm.value;
    this.updateUser.emit(form);
  }

  changeRole(event:any){
    let name = event?.originalEvent.target?.innerText;
    let role:UserRole = {id:event?.value, name:name, userId:this.user?.id!, createdAt: new Date()};

      this.roleUpdate.emit(role);
      this.isformChanged = false;
  }

  isInputChanged(event:any){
      this.isformChanged = false;
  }

}
