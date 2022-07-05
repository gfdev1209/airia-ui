import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './alert.state';
import * as Actions from './alert.actions';

export const alertReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { alerts }) => ({
    ...adapter.setAll(alerts, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getAllFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(
    Actions.skipAndTakeAlertTable,
    Actions.skipAndTakeReportTable,
    Actions.skipAndTakeAlertPanel,
    (state) => {
      return {
        ...state,
        loading: true,
      };
    }
  ),
  on(Actions.skipAndTakeSuccess, (state, { alerts }) => ({
    ...adapter.setAll(alerts, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.skipAndTakeFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getFromMinutes, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getFromMinutesSuccess, (state, { alerts }) => ({
    ...adapter.setAll(alerts, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getFromMinutesFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getFromDate, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getFromDateSuccess, (state, { alerts }) => ({
    ...adapter.setAll(alerts, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getFromDateFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getFromDateToDate, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getFromDateToDateSuccess, (state, { alerts }) => ({
    ...adapter.setAll(alerts, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getFromDateToDateFailed, (state) => {
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
  on(Actions.selectSuccess, (state, { alert }) => ({
    ...state,
    selected: alert,
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
  on(Actions.setSortType, (state, { sortType }) => ({
    ...state,
    sortType,
  })),
  on(Actions.setSortDirection, (state, { direction }) => ({
    ...state,
    sortDirection: direction,
  })),
  on(Actions.acknowledgeAlert, (state, { alert }) => ({
    ...state,
    loading: true,
  })),
  on(Actions.acknowledgeAlertSuccess, (state, { alert }) => {
    return adapter.upsertOne(alert, {
      ...state,
      selected: state.selected?.id === alert.id ? alert : state.selected,
      loading: false,
      loaded: true,
    });
  }),
  on(Actions.acknowledgeAlertFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.pinAlert, (state, { alert }) => ({
    ...state,
    loading: true,
  })),

  on(Actions.pinAlertFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getPinnedAlert, (state) => { 
    return {
    ...state,
    loading: true,
  }
}),
  on(Actions.getPinnedAlertSuccess, (state, { alerts }) =>{
  return adapter.upsertMany(alerts, {
    ...state,
    pinnedAlert: alerts,
    loading: false,
    loaded: true,
  });
}),
  on(Actions.getPinnedAlertFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  })
);


