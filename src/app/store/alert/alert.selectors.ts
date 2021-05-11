import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, AlertState } from './alert.state';

export const selectFeature = (state: RootState) => state.alerts;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: AlertState) => state.loading
);

export const selectSelectedAlert = createSelector(
  selectFeature,
  (state: AlertState) => state.selected
);
