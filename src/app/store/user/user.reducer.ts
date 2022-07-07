import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './user.state';
import * as Actions from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(Actions.getAll, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getAllSuccess, (state, { users }) => ({
    ...adapter.setAll(users, state),
    loading: false,
    loaded: true,
  })),
  on(Actions.getAllFailed, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(Actions.getSelf, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(Actions.getSelfSuccess, (state, { user }) => ({
    ...state,
    self: { ...user },
    loading: false,
    loaded: true,
  })),
  on(Actions.getSelfFailed, (state) => {
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
  on(Actions.selectSuccess, (state, { user }) => ({
    ...state,
    selected: { ...user },
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
  on(Actions.updateRole, (state) => {
    return {
        ...state,
        loading: true,
        showOverview: false,
    };
  }),
  on(Actions.updateRoleSuccess, (state, { role }) => {
    return {
      ...state,
      loading: true,
      showOverview: false,
  };
  }),
  on(Actions.updateRoleFailed, (state) => {
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
  })
)

