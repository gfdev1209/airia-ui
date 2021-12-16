import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, RegionState } from './region.state';

export const selectFeature = (state: RootState) => state.regions;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: RegionState) => state.loading
);

export const selectSelectedRegion = createSelector(
  selectFeature,
  (state: RegionState) => state.selected
);

export const selectOccupancy = createSelector(
  selectFeature,
  (state: RegionState) => state.occupancy
);
