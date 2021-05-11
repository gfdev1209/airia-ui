import { ActionReducerMap } from '@ngrx/store';
import { alertReducer } from './alert/alert.reducer';
import { AlertState } from './alert/alert.state';

export interface RootState {
  alerts: AlertState;
}
export const reducers: ActionReducerMap<RootState> = {
  alerts: alertReducer,
};
