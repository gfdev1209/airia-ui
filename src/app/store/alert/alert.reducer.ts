import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './alert.state';
import * as Actions from './alert.actions';

export const alertReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { alerts }) => ({
    ...adapter.setAll(alerts, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getAllFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.select, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.selectSuccess, (state, { alert }) => ({
    ...state,
    selected: alert,
    loading: false,
    loaded: true,
  })),
  on(Actions.selectFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  })
);
