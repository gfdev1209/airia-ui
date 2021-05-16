import { ActionReducerMap } from '@ngrx/store';
import { alertReducer } from './alert/alert.reducer';
import { AlertState } from './alert/alert.state';
import { buildingReducer } from './building/building.reducer';
import { BuildingState } from './building/building.state';

export interface RootState {
  alerts: AlertState;
  buildings: BuildingState;
}
export const reducers: ActionReducerMap<RootState> = {
  alerts: alertReducer,
  buildings: buildingReducer,
};
