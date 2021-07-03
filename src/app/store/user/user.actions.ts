import { createAction, props } from '@ngrx/store';
import { User } from '@map/models';

export const getAll = createAction('[Map] Get All Users');
export const getAllSuccess = createAction(
  '[User Effect] Get All Users Success',
  props<{ users: User[] }>()
);
export const getAllFailed = createAction('[User Effect] Get All Users Failed');

export const select = createAction(
  '[Map Search Bar] Select User',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[User Effect] Select User Success',
  props<{ user: User }>()
);
export const selectFailed = createAction('[User Effect] Select User Failed');
