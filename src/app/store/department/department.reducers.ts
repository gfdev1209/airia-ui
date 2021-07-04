import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './department.state';
import * as Actions from './department.actions';

export const departmentReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { departments }) => ({
    ...adapter.setAll(departments, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getAllFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getByBuildingId, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getByBuildingIdSuccess, (state, { departments }) => ({
    ...adapter.setAll(departments, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getByBuildingIdFailed, (state) => {
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
  on(Actions.selectSuccess, (state, { department }) => ({
    ...state,
    selected: { ...department },
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
