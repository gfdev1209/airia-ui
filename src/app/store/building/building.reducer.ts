import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './building.state';
import * as Actions from './building.actions';

export const buildingReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { buildings }) => ({
    ...adapter.setAll(buildings, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getAllFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.search, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.searchSuccess, (state, { buildings }) => {
    return {
      ...state,
      searchResults: buildings,
      loading: false,
      loaded: true,
    };
  }),
  on(Actions.searchFailed, (state) => {
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
  on(Actions.selectSuccess, (state, { building }) => ({
    ...state,
    selected: { ...building },
    loading: false,
    loaded: true,
  })),
  on(Actions.selectFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.deselect, (state) => {
    return {
      ...state,
      selected: null,
    };
  }),
  on(Actions.showOverview, (state) => {
    return {
      ...state,
      showOverview: true,
    };
  }),
  on(Actions.hideOverview, (state) => {
    return {
      ...state,
      showOverview: false,
    };
  })
);
