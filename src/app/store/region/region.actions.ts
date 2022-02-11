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

export const getBuildingRegions = createAction('[Map] Get Building Regions');
export const getBuildingRegionsSuccess = createAction(
  '[Region Effect] Get Building Regions Success',
  props<{ regions: Region[] }>()
);
export const getBuildingRegionsFailed = createAction(
  '[Region Effect] Get Building Regions Failed'
);

export const getOccupancy = createAction(
  '[Building Details] Get Occupancy',
  props<{ id: number; year: number; month: number; day?: number }>()
);
export const getOccupancySuccess = createAction(
  '[Region Effect] Get Occupancy Success',
  props<{ occupancy: Occupancy }>()
);
export const getOccupancyFailed = createAction(
  '[Region Effect] Get Occupancy Failed'
);

export const getOccupancyRange = createAction(
  '[Building Details] Get Occupancy Range',
  props<{ id: number; from: Date; to: Date }>()
);
export const getOccupancyRangeSuccess = createAction(
  '[Region Effect] Get Occupancy Range Success',
  props<{ occupancy: Occupancy }>()
);
export const getOccupancyRangeFailed = createAction(
  '[Region Effect] Get Occupancy Range Failed'
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
