import { createAction, props } from '@ngrx/store';
import { AlertSortType } from '@map/enums';
import { Alert } from '@map/models';
import { SkipTakeInput } from '@shared/models/skip-take-input.model';

export const getAll = createAction('[Map] Get All Alerts');
export const getAllSuccess = createAction(
  '[Map Effect] Get All Alerts Success',
  props<{ alerts: Alert[] }>()
);
export const getAllFailed = createAction('[Map Effect] Get All Alerts Failed');

export const skipAndTakeAlertPanel = createAction(
  '[Alert Panel] Skip and Take Alerts',
  props<{ skipTakeInput: SkipTakeInput }>()
);
export const skipAndTakeReportTable = createAction(
  '[Report Table] Skip and Take Alerts',
  props<{ skipTakeInput: SkipTakeInput }>()
);
export const skipAndTakeAlertTable = createAction(
  '[Alert Table] Skip and Take Alerts',
  props<{ skipTakeInput: SkipTakeInput }>()
);
export const skipAndTakeSuccess = createAction(
  '[Map Effect] Skip and Take Alerts Success',
  props<{ alerts: Alert[] }>()
);
export const skipAndTakeFailed = createAction(
  '[Map Effect] Skip and Take Alerts Failed'
);

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
export const setSortDirection = createAction(
  '[Overview Panel] Set Alert Sort Direction',
  props<{ direction: number }>()
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

export const pinAlert = createAction(
  '[Alert Details] Pin Alert',
  props<{ alert: Alert }>()
);
export const pinAlertSuccess = createAction(
  '[Alert Effect] Pin Alert Success',
  props<{ alert: Alert | null }>()
);
export const pinAlertFailed = createAction(
  '[Alert Effect] Pin Alert Failed'
);
