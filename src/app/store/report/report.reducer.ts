import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './report.state';
import * as Actions from './report.actions';

export const reportReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { reports }) => ({
    ...adapter.setAll(reports, state),
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
  on(Actions.getByBuildingIdSuccess, (state, { reports }) => ({
    ...adapter.setAll(reports, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getByBuildingIdFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.create, (state) => {
    return {
      ...state,
      loading: true,
      showOverview: false,
    };
  }),
  on(Actions.createSuccess, (state, { report }) => {
    return adapter.addOne(report, {
      ...state,
      loading: false,
      loaded: true,
    });
  }),
  on(Actions.createFailed, (state) => {
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
  on(Actions.updateSuccess, (state, { report }) => {
    return adapter.updateOne(report, {
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
  on(Actions.selectSuccess, (state, { report }) => ({
    ...state,
    selected: { ...report },
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
