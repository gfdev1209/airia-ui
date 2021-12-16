import { createAction, props } from '@ngrx/store';
import { Occupancy, Region } from '@map/models';

export const getAll = createAction('[Map] Get All Regions');
export const getAllSuccess = createAction(
  '[Region Effect] Get All Regions Success',
  props<{ regions: Region[] }>()
);
export const getAllFailed = createAction(
  '[Region Effect] Get All Regions Failed'
);

export const getOccupancy = createAction(
  '[Building Details] Get Occupancy',
  props<{ id: number; year: number; month: number; day: number }>()
);
export const getOccupancySuccess = createAction(
  '[Region Effect] Get Occupancy Success',
  props<{ occupancy: Occupancy[] }>()
);
export const getOccupancyFailed = createAction(
  '[Region Effect] Get Occupancy Failed'
);

export const select = createAction(
  '[Map Search Bar] Select Region',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Region Effect] Select Region Success',
  props<{ region: Region }>()
);
export const selectFailed = createAction(
  '[Region Effect] Select Region Failed'
);
