import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, AccessPointState } from './access-point.state';

export const selectFeature = (state: RootState) => state.accessPoints;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: AccessPointState) => state.loading
);

export const selectSelectedAccessPoint = createSelector(
  selectFeature,
  (state: AccessPointState) => state.selected
);