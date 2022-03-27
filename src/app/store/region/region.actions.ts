import { createAction, props } from '@ngrx/store';
import { Occupancy, Region } from '@map/models';
import { Update } from '@ngrx/entity';

export const getAll = createAction('[Map] Get All Regions');
export const getAllSuccess = createAction(
  '[Region Effect] Get All Regions Success',
  props<{ regions: Region[] }>()
);
export const getAllFailed = createAction(
  '[Region Effect] Get All Regions Failed'
);

export const search = createAction(
  '[Region Search Bar] Search Regions',
  props<{ term: string }>()
);
export const searchSuccess = createAction(
  '[Region Effect] Search Regions Success',
  props<{ searchResults: Region[] }>()
);
export const searchFailed = createAction(
  '[Region Effect] Search Regions Failed'
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
  '[Region Details] Get Occupancy',
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
  '[Region Details] Get Occupancy Range',
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

export const deselect = createAction('[Region Details] Deselect Region');

export const update = createAction(
  '[Region Form] Update Region',
  props<{ region: Update<Region> }>()
);
export const updateSuccess = createAction(
  '[Region Effect] Update Region Success',
  props<{ region: Update<Region> }>()
);
export const updateFailed = createAction(
  '[Region Effect] Update Region Failed'
);

export const updateRegionPolygon = createAction(
  '[Region Form] Update Region Polygon',
  props<{ id: number; polygon?: number[][] }>()
);
export const updateRegionPolygonMap = createAction(
  '[Map] Update Region Polygon',
  props<{ id: number; polygon?: number[][] }>()
);
export const updateRegionPolygonSuccess = createAction(
  '[Region Effect] Update Region Polygon Success',
  props<{ region: Region }>()
);
export const updateRegionPolygonFailed = createAction(
  '[Region Effect] Update Region Polygon Failed'
);

export const editRegionShape = createAction('[Region Form] Edit Region Shape');
export const cancelEditRegionShape = createAction(
  '[Map] Cancel Edit Region Shape'
);
