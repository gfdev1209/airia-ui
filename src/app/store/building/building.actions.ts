import { createAction, props } from '@ngrx/store';
import { Building } from 'src/app/map/models';

export const getAll = createAction('[Map] Get All Buildings');
export const getAllSuccess = createAction(
  '[Building Effect] Get All Buildings Success',
  props<{ buildings: Building[] }>()
);
export const getAllFailed = createAction(
  '[Building Effect] Get All Buildings Failed'
);

export const search = createAction(
  '[Map Search Bar] Search Buildings',
  props<{ term: string }>()
);
export const searchSuccess = createAction(
  '[Building Effect] Get All Buildings Success',
  props<{ buildings: Building[] }>()
);
export const searchFailed = createAction(
  '[Building Effect] Get All Buildings Failed'
);

export const select = createAction(
  '[Map Search Bar] Select Building',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Building Effect] Select Building Success',
  props<{ building: Building }>()
);
export const selectFailed = createAction(
  '[Building Effect] Select Building Failed'
);

export const deselect = createAction('[Building Details] Deselect Building');
