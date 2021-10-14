import { createAction, props } from '@ngrx/store';
import { UserRole } from '@map/models';

export const getAll = createAction('[Map] Get All Roles');
export const getAllSuccess = createAction(
  '[Role Effect] Get All Roles Success',
  props<{ roles: UserRole[] }>()
);
export const getAllFailed = createAction('[Role Effect] Get All Roles Failed');

export const select = createAction(
  '[Map Search Bar] Select Role',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Role Effect] Select Role Success',
  props<{ role: UserRole }>()
);
export const selectFailed = createAction('[Role Effect] Select Role Failed');
