import { Floor } from '@map/models';
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

export const selectSelectedFloorNumber = createSelector(
  selectFeature,
  (state: FloorState) => state.selectedFloorNumber
);
export const selectCloseFormModal = createSelector(
  selectFeature,
  (state: FloorState) => state.closeFormModal
);

export const selectAllUnique = createSelector(selectAll, (state: Floor[]) => {
  return state
    .map((item) => item.floorId)
    .filter((v: any, i: any, a: any) => a.indexOf(v) === i);
});

export const selectByBuildingId = createSelector(
  selectAll,
  (state: any, props: any) => {
    return state.filter((x: Floor) => x.buildingId === props.buildingId);
  }
);
