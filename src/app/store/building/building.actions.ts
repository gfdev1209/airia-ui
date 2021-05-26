import { createAction, props } from '@ngrx/store';
import { Building } from '@map/models';

export const getAll = createAction('[Map] Get All Buildings');
export const getAllSuccess = createAction(
  '[Building Effect] Get All Buildings Success',
  props<{ buildings: Building[] }>()
);
export const getAllFailed = createAction(
  '[Building Effect] Get All Buildings Failed'
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

export const showOverview = createAction('[Map] Show Building Overview');
export const hideOverview = createAction('[Map] Hide Building Overview');

export const deselect = createAction('[Building Details] Deselect Building');
