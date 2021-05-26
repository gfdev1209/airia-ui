import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, FloorState } from './floor.state';

export const selectFeature = (state: RootState) => state.floors;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: FloorState) => state.loading
);

export const selectSelectedFloor = createSelector(
  selectFeature,
  (state: FloorState) => state.selected
);
