import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CreateReportInput } from 'src/app/report/models';
import { Report } from 'src/app/report/models/report.model';

export const getAll = createAction('[Map] Get All Reports');
export const getAllSuccess = createAction(
  '[Report Effect] Get All Reports Success',
  props<{ reports: Report[] }>()
);
export const getAllFailed = createAction(
  '[Report Effect] Get All Reports Failed'
);

export const getByBuildingId = createAction(
  '[Map] Get Reports by Building Id',
  props<{ buildingId: number }>()
);
export const getByBuildingIdSuccess = createAction(
  '[Report Effect] Get Reports by Building Id Success',
  props<{ reports: Report[] }>()
);
export const getByBuildingIdFailed = createAction(
  '[Report Effect] Get Reports by Building Id Failed'
);

export const create = createAction(
  '[Report Form] Create Report Request',
  props<{ createReportInput: CreateReportInput }>()
);
export const createSuccess = createAction(
  '[Report Effect] Create Report Success',
  props<{ report: Report }>()
);
export const createFailed = createAction(
  '[Report Effect] Create Report Failed'
);

export const update = createAction(
  '[Report Form] Update Report',
  props<{ report: Update<Report> }>()
);
export const updateSuccess = createAction(
  '[Report Effect] Update Report Success',
  props<{ report: Update<Report> }>()
);
export const updateFailed = createAction(
  '[Report Effect] Update Report Failed'
);

export const select = createAction(
  '[Map Search Bar] Select Report',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Report Effect] Select Report Success',
  props<{ report: Report }>()
);
export const selectFailed = createAction(
  '[Report Effect] Select Report Failed'
);

export const deselect = createAction('[Report Table] Deselect Report');

export const closeFormModal = createAction(
  '[Report Effect] Close Report Form Modal'
);
