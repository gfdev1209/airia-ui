import { Alert } from '@map/models';
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

export const selectSortType = createSelector(
  selectFeature,
  (state: AlertState) => state.sortType
);

export const selectSortDirection = createSelector(
  selectFeature,
  (state: AlertState) => state.sortDirection
);

export const selectPinnedAlerts = createSelector(
  selectFeature,
  (state: AlertState) => state.pinnedAlert
);

// export const selectByBuildingId = createSelector(
//   selectAll,
//   (state: any, props: any) =>
//     state.filter((x: Alert) => x.buildingId === props.buildingId)
// );
