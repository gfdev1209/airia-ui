import { createAction, props } from '@ngrx/store';
import { AccessPoint } from '@map/models';
import { Update } from '@ngrx/entity';

export const getAll = createAction('[Map] Get All Access Points');
export const getAllSuccess = createAction(
  '[Map Effect] Get All Access Points Success',
  props<{ accessPoints: AccessPoint[] }>()
);
export const getAllFailed = createAction(
  '[Map Effect] Get All Access Points Failed'
);

export const get = createAction(
  '[Access Point Panel] Get Access Point',
  props<{ id: number }>()
);
export const getSuccess = createAction(
  '[Access Point Effect] Get Access Point Success',
  props<{ accessPoint: AccessPoint }>()
);
export const getFailed = createAction(
  '[Access Point Effect] Get Access Point Failed'
);

export const update = createAction(
  '[Access Point Form] Update Access Point',
  props<{ accessPoint: Update<AccessPoint> }>()
);
export const updateSuccess = createAction(
  '[Access Point Effect] Update Access Point Success',
  props<{ accessPoint: Update<AccessPoint> }>()
);
export const updateFailed = createAction(
  '[Access Point Effect] Update Access Point Failed'
);

export const select = createAction(
  '[Access Point Panel] Select Access Point',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Access Point Effect] Select Access Point Success',
  props<{ accessPoint: AccessPoint }>()
);
export const selectFailed = createAction(
  '[Access Point Effect] Select Access Point Failed'
);

export const deselect = createAction(
  '[Access Point Details] Deselect Access Point'
);

export const search = createAction(
  '[Access Point Settings Search Bar] Search Access Points',
  props<{ term: string }>()
);
export const searchSuccess = createAction(
  '[Access Point Effect] Search Access Points Success',
  props<{ searchResults: AccessPoint[] }>()
);
export const searchFailed = createAction(
  '[Access Point Effect] Search Access Points Failed'
);

export const closeFormModal = createAction(
  '[Access Point Effect] Close Access Point Form Modal'
);
