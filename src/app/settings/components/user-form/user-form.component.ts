import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';

import * as UserActions from '@store/user/user.actions';
import * as UserSelectors from '@store/user/user.selectors';
import * as DepartmentActions from '@store/department/department.actions';
import * as DepartmentSelectors from '@store/department/department.selectors';
import * as RoleActions from '@store/role/role.actions';
import * as RoleSelectors from '@store/role/role.selectors';
import * as LocationActions from '@store/location/location.actions';
import * as LocationSelectors from '@store/location/location.selectors';
import { tap } from 'rxjs/operators';
import { NotificationService } from '@shared/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  user$ = this.store.select(UserSelectors.selectSelectedUser).pipe(
    tap((user) => {
      if (!user && this.userId) {
        this.store.dispatch(UserActions.select({ id: +this.userId }));
      }
    })
  );
  locations$ = this.store.select(LocationSelectors.selectAll);
  departments$ = this.store.select(DepartmentSelectors.selectAll);
  roles$ = this.store.select(RoleSelectors.selectAll);
  updatedUser$ = this.store.select(UserSelectors.selectUpdatedUser);
  updateuserSubs?: Subscription;
  userId?: string | null;

  constructor(private store: Store<RootState>, private route: ActivatedRoute, private notifier: NotificationService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(LocationActions.getAll());
    this.store.dispatch(DepartmentActions.getAll());
    this.store.dispatch(RoleActions.getAll());

   this.updateuserSubs = this.updatedUser$.subscribe(update=>{
      if(update){
        this.notifier.displaySuccess("User Updated Successfully");
        this.store.dispatch(UserActions.updateFailed());
      }
     
    })
  }


  updateUserRole(role:any){
    this.store.dispatch(UserActions.updateRole({role}));
  }

  updateUser(user:any){
    this.store.dispatch(UserActions.update({user}));
    
  }

  ngOnDestroy(){
    this.updateuserSubs?.unsubscribe();
  }

}
