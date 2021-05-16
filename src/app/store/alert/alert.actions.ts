import { createAction, props } from '@ngrx/store';
import { AlertSortType } from 'src/app/map/enums';
import { Alert } from 'src/app/map/models';

export const getAll = createAction('[Map] Get All Alerts');
export const getAllSuccess = createAction(
  '[Map Effect] Get All Alerts Success',
  props<{ alerts: Alert[] }>()
);
export const getAllFailed = createAction('[Map Effect] Get All Alerts Failed');

export const select = createAction(
  '[Alert Panel] Select Alert',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Alert Effect] Select Alert Success',
  props<{ alert: Alert }>()
);
export const selectFailed = createAction('[Alert Effect] Select Alert Failed');

export const deselect = createAction('[Alert Details] Deselect Alert');

export const setSortType = createAction(
  '[Overview Panel] Set Alert Sort Type',
  props<{ sortType: AlertSortType }>()
);
