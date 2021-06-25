import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Device } from '@map/models';

export interface DeviceState extends EntityState<Device> {
  selected: Device | null;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<Device>();
export const initialState: DeviceState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
});
