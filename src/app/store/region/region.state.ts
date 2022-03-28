import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Occupancy, Region } from '@map/models';

export interface RegionState extends EntityState<Region> {
  selected: Region | null;
  searchResults: Region[] | null;
  buildingRegions: Region[];
  editShape: boolean;
  loaded: boolean;
  loading: boolean;
  occupancy: Occupancy | null;
}
export const adapter = createEntityAdapter<Region>();
export const initialState: RegionState = adapter.getInitialState({
  selected: null,
  searchResults: [],
  buildingRegions: [],
  loaded: false,
  editShape: false,
  loading: false,
  occupancy: null,
});
