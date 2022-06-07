import { Region } from '@map/models';
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

export const selectByBuildingId = createSelector(
  selectFeature,
  (state: RegionState, props: any) => {
    return state.buildingRegions.filter(
      (x: Region) =>
        x.buildingId === props.buildingId &&
        x.activeType === 'Active'
    )[0];
  }
);
export const selectEditingShape = createSelector(
  selectFeature,
  (state: RegionState) => state.editShape
);

export const selectSearchResults = createSelector(
  selectFeature,
  (state: RegionState) => state.searchResults
);

export const selectBuildingRegions = createSelector(
  selectFeature,
  (state: RegionState) => state.buildingRegions
);

export const selectActiveRegions = createSelector(
  selectAll,
  (state: Region[]) => state.filter((x: Region) => x.activeType === 'Active')
);

export const selectSelectedRegion = createSelector(
  selectFeature,
  (state: RegionState) => state.selected
);

export const selectOccupancy = createSelector(
  selectFeature,
  (state: RegionState) => state.occupancy
);
