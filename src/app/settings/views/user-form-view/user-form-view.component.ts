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
    console.log("user", this.user)
    this.userForm = this.fb.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [
        this.user?.phone,
        [Validators.required, Validators.minLength(10)],
      ],
      departmentId: [this.user?.departmentId, [Validators.required]],
      locations: ['', [Validators.required]],
      defaultLocation: ['', Validators.required],
      roleId: [this.user?.roleId, [Validators.required]],
    });
  }

  saveUser(){
    let form = this.userForm.value;

    // const data  = {
    //   departmentId: 0,
    //   firstName: "string",
    //   lastName: "string",
    //   phone: "string"
    // }


  }

  changeRole(event:any){
    let name = event?.originalEvent.target?.innerText;
    let role:UserRole = {id:event?.value, name:name, userId:this.user?.id!, createdAt: new Date()};

      this.roleUpdate.emit(role);

  }

}
