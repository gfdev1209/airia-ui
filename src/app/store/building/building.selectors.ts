import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, BuildingState } from './building.state';

export const selectFeature = (state: RootState) => state.buildings;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: BuildingState) => state.loading
);

export const selectSearchResults = createSelector(
  selectFeature,
  (state: BuildingState) => state.searchResults
);

export const selectSelectedBuilding = createSelector(
  selectFeature,
  (state: BuildingState) => state.selected
);

export const selectShowOverview = createSelector(
  selectFeature,
  (state: BuildingState) => state.showOverview
);

export const selectShowDetails = createSelector(
  selectFeature,
  (state: BuildingState) => state.showDetails
);
