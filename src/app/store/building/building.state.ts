import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Building } from '@map/models';

export interface BuildingState extends EntityState<Building> {
  selected: Building | null;
  searchResults: Building[] | null;
  showOverview: boolean;
  showDetails: boolean;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<Building>();
export const initialState: BuildingState = adapter.getInitialState({
  selected: null,
  searchResults: [],
  showOverview: false,
  showDetails: false,
  loaded: false,
  loading: false,
});
