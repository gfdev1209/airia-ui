import { ActionReducerMap } from '@ngrx/store';
import { alertReducer } from './alert/alert.reducer';
import { AlertState } from './alert/alert.state';
import { buildingReducer } from './building/building.reducer';
import { BuildingState } from './building/building.state';
import { locationReducer } from './location/location.reducer';
import { LocationState } from './location/location.state';
import { floorReducer } from './floor/floor.reducer';
import { FloorState } from './floor/floor.state';

export interface RootState {
  alerts: AlertState;
  locations: LocationState;
  buildings: BuildingState;
  floors: FloorState;
}
export const reducers: ActionReducerMap<RootState> = {
  alerts: alertReducer,
  locations: locationReducer,
  buildings: buildingReducer,
  floors: floorReducer,
};
