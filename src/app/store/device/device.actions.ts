import { createAction, props } from '@ngrx/store';
import { Device } from '@map/models';

export const getAll = createAction('[Map] Get All Devices');
export const getAllSuccess = createAction(
  '[Device Effect] Get All Devices Success',
  props<{ devices: Device[] }>()
);
export const getAllFailed = createAction(
  '[Device Effect] Get All Devices Failed'
);

export const getSeenFromMinutes = createAction(
  '[Map] Get Devices Seen From Minutes',
  props<{ fromMin: number }>()
);
export const getSeenFromMinutesSuccess = createAction(
  '[Device Effect] Get Devices Seen From Minutes Success',
  props<{ devices: Device[] }>()
);
export const getSeenFromMinutesFailed = createAction(
  '[Device Effect] Get Devices Seen From Minutes Failed'
);

export const getSeenFromDate = createAction(
  '[Map] Get Devices Seen From Date',
  props<{ date: Date }>()
);
export const getSeenFromDateSuccess = createAction(
  '[Device Effect] Get Devices Seen From Date Success',
  props<{ devices: Device[] }>()
);
export const getSeenFromDateFailed = createAction(
  '[Device Effect] Get Devices Seen From Date Failed'
);

export const getSeenFromDateToDate = createAction(
  '[Map] Get Devices Seen From Date To Date',
  props<{ from: Date; to: Date }>()
);
export const getSeenFromDateToDateSuccess = createAction(
  '[Device Effect] Get Devices Seen From Date To Date Success',
  props<{ devices: Device[] }>()
);
export const getSeenFromDateToDateFailed = createAction(
  '[Device Effect] Get Devices Seen From Date To Date Failed'
);

export const getByBuildingId = createAction(
  '[Map] Get Devices by Building Id',
  props<{ buildingId: number }>()
);
export const getByBuildingIdSuccess = createAction(
  '[Device Effect] Get Devices by Building Id Success',
  props<{ devices: Device[] }>()
);
export const getByBuildingIdFailed = createAction(
  '[Device Effect] Get Devices by Building Id Failed'
);

export const select = createAction(
  '[Map Search Bar] Select Device',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Device Effect] Select Device Success',
  props<{ device: Device }>()
);
export const selectFailed = createAction(
  '[Device Effect] Select Device Failed'
);
