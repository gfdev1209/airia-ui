import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, DeviceState } from './device.state';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Device } from '@map/models';

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

export const selectByMinutes = createSelector(selectFeature, (state: any) => {
  // console.log(state.entities);
  return _.groupBy(state.entities, (device: Device) => {
    return moment(device.ingestionTime).startOf('minute').format();
  });
});
