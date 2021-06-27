import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './device.state';
import * as Actions from './device.actions';

export const deviceReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { devices }) => ({
    ...adapter.setAll(devices, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getAllFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getSeenFromMinutes, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getSeenFromMinutesSuccess, (state, { devices }) => ({
    ...adapter.setAll(devices, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getSeenFromMinutesFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getSeenFromDate, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getSeenFromDateSuccess, (state, { devices }) => ({
    ...adapter.setAll(devices, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getSeenFromDateFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getSeenFromDateToDate, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getSeenFromDateToDateSuccess, (state, { devices }) => ({
    ...adapter.setAll(devices, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getSeenFromDateToDateFailed, (state) => {
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
  on(Actions.getByBuildingIdSuccess, (state, { devices }) => ({
    ...adapter.setAll(devices, state),
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
  on(Actions.selectSuccess, (state, { device }) => ({
    ...state,
    selected: { ...device },
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
