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
  on(Actions.deselect, (state) => {
    return {
      ...state,
      selected: null,
      showOverview: false,
      showDetails: false,
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
  }),
  on(Actions.getOccupancyRange, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getOccupancyRangeSuccess, (state, { occupancy }) => ({
    ...state,
    occupancy,
    loading: false,
    loaded: true,
  })),
  on(Actions.getOccupancyRangeFailed, (state) => {
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
  on(Actions.updateSuccess, (state, { region }) => {
    return adapter.updateOne(region, {
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
  on(Actions.editRegionShape, (state) => {
    return {
      ...state,
      loading: true,
      editRegionShape: true,
    };
  }),
  on(Actions.cancelEditRegionShape, (state) => {
    return {
      ...state,
      editRegionShape: false,
    };
  }),
  on(Actions.updateRegionPolygon, Actions.updateRegionPolygonMap, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.updateRegionPolygonSuccess, (state, { region }) => {
    return adapter.upsertOne(region, {
      ...state,
      editRegionShape: false,
      loading: false,
      loaded: true,
    });
  }),
  on(Actions.updateRegionPolygonFailed, (state) => {
    return {
      ...state,
      editRegionShape: false,
      loading: false,
    };
  })
);
