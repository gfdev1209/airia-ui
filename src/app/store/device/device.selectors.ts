import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, DeviceState } from './device.state';

export const selectFeature = (state: RootState) => state.devices;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: DeviceState) => state.loading
);

export const selectSelectedDevice = createSelector(
  selectFeature,
  (state: DeviceState) => state.selected
);
