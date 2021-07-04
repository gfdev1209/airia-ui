import { createAction, props } from '@ngrx/store';
import { Department } from '@map/models';

export const getAll = createAction('[Map] Get All Departments');
export const getAllSuccess = createAction(
  '[Department Effect] Get All Departments Success',
  props<{ departments: Department[] }>()
);
export const getAllFailed = createAction(
  '[Department Effect] Get All Departments Failed'
);

export const getByBuildingId = createAction(
  '[Map] Get Departments by Building Id',
  props<{ buildingId: number }>()
);
export const getByBuildingIdSuccess = createAction(
  '[Department Effect] Get Departments by Building Id Success',
  props<{ departments: Department[] }>()
);
export const getByBuildingIdFailed = createAction(
  '[Department Effect] Get Departments by Building Id Failed'
);

export const select = createAction(
  '[Map Search Bar] Select Department',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Department Effect] Select Department Success',
  props<{ department: Department }>()
);
export const selectFailed = createAction(
  '[Department Effect] Select Department Failed'
);
