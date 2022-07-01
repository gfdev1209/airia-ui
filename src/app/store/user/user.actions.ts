import { createAction, props } from '@ngrx/store';
import { User, UserRole } from '@map/models';
import { Update } from '@ngrx/entity';

export const getSelf = createAction('[User List Page] Get Self');
export const getSelfSuccess = createAction(
  '[User Effect] Get Self Success',
  props<{ user: User }>()
);
export const getSelfFailed = createAction('[User Effect] Get Self Failed');

export const getAll = createAction('[User List Page] Get All Users');
export const getAllSuccess = createAction(
  '[User Effect] Get All Users Success',
  props<{ users: User[] }>()
);
export const getAllFailed = createAction('[User Effect] Get All Users Failed');

export const select = createAction(
  '[User List Search Bar] Select User',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[User Effect] Select User Success',
  props<{ user: User }>()
);
export const selectNotFound = createAction(
  '[User Effect] Select User Entity Not Found'
);
export const selectFailed = createAction('[User Effect] Select User Failed');

export const deselect = createAction('[User List Page] Deselect User');

export const search = createAction(
  '[User List Search Bar] Search Users',
  props<{ term: string }>()
);
export const searchSuccess = createAction(
  '[User Effect] Search Users Success',
  props<{ searchResults: User[] }>()
);
export const searchFailed = createAction('[User Effect] Search Users Failed');


export const updateRole = createAction('[User Role] Update User Role', props<{ role: UserRole }>());
export const updateRoleSuccess = createAction('[Role Effect] Update User Role Success', props<{ role: UserRole }>());
export const updateRoleFailed = createAction('[Role Effect] Update User Role Failed');

export const update = createAction('[Update User] Update User', props<{ user: User }>());
export const updateSuccess = createAction('[User Effect] Update User Success', props<{ updated:boolean }>());
export const updateFailed = createAction('[User Effect] Update User Failed');
