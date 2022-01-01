import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './region.state';
import * as Actions from './region.actions';

export const regionReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { regions }) => ({
    ...adapter.setAll(regions, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getAllFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getBuildingRegions, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getBuildingRegionsSuccess, (state, { regions }) => ({
    ...state,
    buildingRegions: regions,
    loading: false,
  })),
  on(Actions.getBuildingRegionsFailed, (state) => {
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
  on(Actions.selectSuccess, (state, { region }) => ({
    ...state,
    selected: { ...region },
    loading: false,
    loaded: true,
  })),
  on(Actions.selectFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getOccupancy, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getOccupancySuccess, (state, { occupancy }) => ({
    ...state,
    occupancy,
    loading: false,
    loaded: true,
  })),
  on(Actions.getOccupancyFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  })
);
