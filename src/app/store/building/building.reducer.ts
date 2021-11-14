import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './building.state';
import * as Actions from './building.actions';
import { state } from '@angular/animations';

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
  on(Actions.get, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getSuccess, (state, { building }) => {
    return adapter.upsertOne(building, {
      ...state,
      loading: false,
      loaded: true,
    });
  }),
  on(Actions.getFailed, (state) => {
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
  }),
  on(Actions.update, (state) => {
    return {
      ...state,
      loading: true,
      showOverview: false,
    };
  }),
  on(Actions.updateSuccess, (state, { building }) => {
    return adapter.updateOne(building, {
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
  on(
    Actions.selectSuccess,
    Actions.selectByMapboxIdSuccess,
    (state, { building }) => ({
      ...state,
      selected: { ...building },
      loading: false,
      loaded: true,
    })
  ),
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
      showOverview: false,
      showDetails: false,
    };
  }),
  on(Actions.getAnalytics, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAnalyticsSuccess, (state, { analytics }) => {
    return {
      ...state,
      analytics,
      loading: false,
    };
  }),
  on(Actions.getAnalyticsFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.selectByMapboxId, (state) => {
    return {
      ...state,
      loading: true,
      showOverview: false,
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
  }),
  on(Actions.showDetails, (state) => {
    return {
      ...state,
      loading: true,
      showOverview: false,
      showDetails: true,
    };
  }),
  on(Actions.hideDetails, (state) => {
    return {
      ...state,
      showDetails: false,
    };
  })
);
