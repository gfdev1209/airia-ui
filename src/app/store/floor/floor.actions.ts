import { createAction, props } from '@ngrx/store';
import { AddFloorInput, Floor } from '@map/models';
import { Update } from '@ngrx/entity';

export const getAll = createAction('[Map] Get All Floors');
export const getAllSuccess = createAction(
  '[Floor Effect] Get All Floors Success',
  props<{ floors: Floor[] }>()
);
export const getAllFailed = createAction(
  '[Floor Effect] Get All Floors Failed'
);

export const getByBuildingId = createAction(
  '[Map] Get Floors by Building Id',
  props<{ buildingId: number }>()
);
export const getByBuildingIdSuccess = createAction(
  '[Floor Effect] Get Floors by Building Id Success',
  props<{ floors: Floor[] }>()
);
export const getByBuildingIdFailed = createAction(
  '[Floor Effect] Get Floors by Building Id Failed'
);

export const add = createAction(
  '[Floor Form] Add Floor Request',
  props<{ addFloorInput: AddFloorInput }>()
);
export const addSuccess = createAction(
  '[Floor Effect] Add Floor Success',
  props<{ floor: Floor }>()
);
export const addFailed = createAction('[Floor Effect] Add Floor Failed');

export const update = createAction(
  '[Floor Form] Update Floor',
  props<{ floor: Update<Floor> }>()
);
export const updateSuccess = createAction(
  '[Floor Effect] Update Floor Success',
  props<{ floor: Update<Floor> }>()
);
export const updateFailed = createAction('[Floor Effect] Update Floor Failed');

export const select = createAction(
  '[Map Search Bar] Select Floor',
  props<{ id: number }>()
);
export const selectSuccess = createAction(
  '[Floor Effect] Select Floor Success',
  props<{ floor: Floor }>()
);
export const selectFailed = createAction('[Floor Effect] Select Floor Failed');

export const deselect = createAction('[Floor Table] Deselect Floor');

export const closeFormModal = createAction(
  '[Floor Effect] Close Floor Form Modal'
);
