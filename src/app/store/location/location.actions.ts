import { createAction, props } from '@ngrx/store';
import { Location } from '@map/models';

export const getAll = createAction('[Map] Get All Locations');
export const getAllSuccess = createAction(
  '[Location Effect] Get All Locations Success',
  props<{ locations: Location[] }>()
);
export const getAllFailed = createAction(
  '[Location Effect] Get All Locations Failed'
);

export const select = createAction(
  '[Map Search Bar] Select Location',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Location Effect] Select Location Success',
  props<{ location: Location }>()
);
export const selectFailed = createAction(
  '[Location Effect] Select Location Failed'
);
