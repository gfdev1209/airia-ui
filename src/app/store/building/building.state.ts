import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Building } from 'src/app/map/models';

export interface BuildingState extends EntityState<Building> {
  selected: Building | null;
  searchResults: Building[];
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<Building>();
export const initialState: BuildingState = adapter.getInitialState({
  selected: null,
  searchResults: [],
  loaded: false,
  loading: false,
});
