import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, LocationState } from './location.state';

export const selectFeature = (state: RootState) => state.locations;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: LocationState) => state.loading
);

export const selectSelectedLocation = createSelector(
  selectFeature,
  (state: LocationState) => state.selected
);
