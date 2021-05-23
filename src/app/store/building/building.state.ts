import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Building } from '@map/models';

export interface BuildingState extends EntityState<Building> {
  selected: Building | null;
  searchResults: Building[] | null;
  showOverview: boolean;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<Building>();
export const initialState: BuildingState = adapter.getInitialState({
  selected: null,
  searchResults: [],
  showOverview: false,
  loaded: false,
  loading: false,
});
