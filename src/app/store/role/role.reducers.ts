import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './role.state';
import * as Actions from './role.actions';

export const roleReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { roles }) => ({
    ...adapter.setAll(roles, state),
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
      showOverview: false,
    };
  }),
  on(Actions.selectSuccess, (state, { role }) => ({
    ...state,
    selected: { ...role },
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
