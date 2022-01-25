import { createAction, props } from '@ngrx/store';
import { Building, BuildingAnalytics } from '@map/models';
import { Update } from '@ngrx/entity';

export const getAll = createAction('[Map] Get All Buildings');
export const getAllSuccess = createAction(
  '[Building Effect] Get All Buildings Success',
  props<{ buildings: Building[] }>()
);
export const getAllFailed = createAction(
  '[Building Effect] Get All Buildings Failed'
);

export const get = createAction(
  '[Building Overview] Get Building',
  props<{ id: number }>()
);
export const getSuccess = createAction(
  '[Building Effect] Get Building Success',
  props<{ building: Building }>()
);
export const getFailed = createAction('[Building Effect] Get Building Failed');

export const update = createAction(
  '[Building Form] Update Building',
  props<{ building: Update<Building> }>()
);
export const updateSuccess = createAction(
  '[Building Effect] Update Building Success',
  props<{ building: Update<Building> }>()
);
export const updateFailed = createAction(
  '[Building Effect] Update Building Failed'
);

export const search = createAction(
  '[Map Search Bar] Search Buildings',
  props<{ term: string }>()
);
export const searchSuccess = createAction(
  '[Building Effect] Search Buildings Success',
  props<{ searchResults: Building[] }>()
);
export const searchFailed = createAction(
  '[Building Effect] Search Buildings Failed'
);

export const select = createAction(
  '[Map Search Bar] Select Building',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Building Effect] Select Building Success',
  props<{ building: Building }>()
);
export const selectNotFound = createAction(
  '[Building Effect] Select Building Entity Not Found'
);
export const selectFailed = createAction(
  '[Building Effect] Select Building Failed'
);

export const selectByMapboxId = createAction(
  '[Map View] Select Building by Mapbox Id',
  props<{ mapboxId: number }>()
);
export const selectByMapboxIdSuccess = createAction(
  '[Building Effect] Select Building by Mapbox Id Success',
  props<{ building: Building }>()
);
export const selectByMapboxIdNotFound = createAction(
  '[Building Effect] Select Building by Mapbox Id Not Found'
);
export const selectByMapboxIdFailed = createAction(
  '[Building Effect] Select Building Failed'
);

export const getAnalytics = createAction(
  '[Building Overview] Get Building Analytics',
  props<{ buildingId: number }>()
);
export const getAnalyticsSuccess = createAction(
  '[Building Effect] Get Building Analytics Success',
  props<{ analytics: BuildingAnalytics }>()
);
export const getAnalyticsFailed = createAction(
  '[Building Effect] Get Building Analytics Failed'
);

export const showOverview = createAction('[Map] Show Building Overview');
export const hideOverview = createAction('[Map] Hide Building Overview');

export const showDetails = createAction('[Map] Show Building Details');
export const hideDetails = createAction('[Map] Hide Building Details');

export const deselect = createAction('[Building Details] Deselect Building');

export const updateBuildingPolygon = createAction(
  '[Building Form] Update Building Polygon',
  props<{ id: number; polygon?: number[][] }>()
);
export const updateBuildingPolygonMap = createAction(
  '[Map] Update Building Polygon',
  props<{ id: number; polygon?: number[][] }>()
);
export const updateBuildingPolygonSuccess = createAction(
  '[Building Effect] Update Building Polygon Success',
  props<{ building: Building }>()
);
export const updateBuildingPolygonFailed = createAction(
  '[Building Effect] Update Building Polygon Failed'
);

export const editBuildingShape = createAction(
  '[Building Form] Edit Building Shape'
);
export const cancelEditBuildingShape = createAction(
  '[Map] Cancel Edit Building Shape'
);
