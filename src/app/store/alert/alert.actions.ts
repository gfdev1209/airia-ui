import { createAction, props } from '@ngrx/store';
import { AlertSortType } from '@map/enums';
import { Alert } from '@map/models';

export const getAll = createAction('[Map] Get All Alerts');
export const getAllSuccess = createAction(
  '[Map Effect] Get All Alerts Success',
  props<{ alerts: Alert[] }>()
);
export const getAllFailed = createAction('[Map Effect] Get All Alerts Failed');

export const getFromMinutes = createAction(
  '[Map] Get Alerts From Minutes',
  props<{ fromMin: number }>()
);
export const getFromMinutesSuccess = createAction(
  '[Alert Effect] Get Alerts From Minutes Success',
  props<{ alerts: Alert[] }>()
);
export const getFromMinutesFailed = createAction(
  '[Alert Effect] Get Alerts From Minutes Failed'
);

export const getFromDate = createAction(
  '[Map] Get Alerts From Date',
  props<{ date: Date }>()
);
export const getFromDateSuccess = createAction(
  '[Alert Effect] Get Alerts From Date Success',
  props<{ alerts: Alert[] }>()
);
export const getFromDateFailed = createAction(
  '[Alert Effect] Get Alerts From Date Failed'
);

export const getFromDateToDate = createAction(
  '[Map] Get Alerts From Date To Date',
  props<{ from: Date; to: Date }>()
);
export const getFromDateToDateSuccess = createAction(
  '[Alert Effect] Get Alerts From Date To Date Success',
  props<{ alerts: Alert[] }>()
);
export const getFromDateToDateFailed = createAction(
  '[Alert Effect] Get Alerts From Date To Date Failed'
);

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

export const acknowledgeAlert = createAction(
  '[Alert Details] Acknowledge Alert',
  props<{ alert: Alert }>()
);
export const acknowledgeAlertSuccess = createAction(
  '[Alert Effect] Acknowledge Alert Success',
  props<{ alert: Alert }>()
);
export const acknowledgeAlertFailed = createAction(
  '[Alert Effect] Acknowledge Alert Failed'
);
