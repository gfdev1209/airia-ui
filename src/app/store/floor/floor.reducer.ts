import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './floor.state';
import * as Actions from './floor.actions';

export const floorReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { floors }) => ({
    ...adapter.setAll(floors, state),
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
  on(Actions.getByBuildingIdSuccess, (state, { floors }) => ({
    ...adapter.setAll(floors, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getByBuildingIdFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.update, (state) => {
    return {
      ...state,
      loading: true,
      showOverview: false,
    };
  }),
  on(Actions.updateSuccess, (state, { floor }) => {
    return adapter.updateOne(floor, {
      ...state,
      loading: false,
      loaded: true,
    });
  }),
  on(Actions.updateFailed, (state) => {
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
  on(Actions.selectSuccess, (state, { floor }) => ({
    ...state,
    selected: { ...floor },
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
  on(Actions.closeFormModal, (state) => {
    return {
      ...state,
      closeFormModal: true,
    };
  })
);
