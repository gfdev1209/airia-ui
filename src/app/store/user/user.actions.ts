import { createAction, props } from '@ngrx/store';
import { User } from '@map/models';

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
