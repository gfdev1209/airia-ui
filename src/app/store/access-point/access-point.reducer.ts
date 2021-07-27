import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './access-point.state';
import * as Actions from './access-point.actions';

export const accessPointReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { accessPoints }) => ({
    ...adapter.setAll(accessPoints, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getAllFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.get, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getSuccess, (state, { accessPoint }) => ({
    ...state,
    loading: false,
    loaded: true,
  })),
  on(Actions.getFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.select, (state, { id }) => ({
    ...state,
    selected: state.entities[id],
    loading: false,
  })),
  // on(Actions.selectSuccess, (state, { accessPoint }) => ({
  //   ...state,
  //   selected: accessPoint,
  //   loading: false,
  //   loaded: true,
  // })),
  // on(Actions.selectFailed, (state) => {
  //   return {
  //     ...state,
  //     loading: false,
  //   };
  // }),
  on(Actions.deselect, (state) => {
    return {
      ...state,
      selected: null,
    };
  }),
  on(Actions.search, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.searchSuccess, (state, { searchResults }) => {
    return {
      ...state,
      searchResults,
      loading: false,
      loaded: true,
    };
  }),
  on(Actions.searchFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  })
);
