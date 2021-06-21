import { createAction, props } from '@ngrx/store';
import { AccessPoint } from '@map/models';

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
