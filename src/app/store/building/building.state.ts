import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Building, BuildingAnalytics } from '@map/models';

export interface BuildingState extends EntityState<Building> {
  selected: Building | null;
  searchResults: Building[] | null;
  showOverview: boolean;
  editBuildingShape: boolean;
  showDetails: boolean;
  analytics: BuildingAnalytics | null;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<Building>();
export const initialState: BuildingState = adapter.getInitialState({
  selected: null,
  searchResults: [],
  showOverview: false,
  showDetails: false,
  editBuildingShape: false,
  analytics: null,
  loaded: false,
  loading: false,
});
