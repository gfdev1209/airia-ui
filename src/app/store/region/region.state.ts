import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Occupancy, Region } from '@map/models';

export interface RegionState extends EntityState<Region> {
  selected: Region | null;
  loaded: boolean;
  loading: boolean;
  occupancy: Occupancy[];
}
export const adapter = createEntityAdapter<Region>();
export const initialState: RegionState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
  occupancy: [],
});
