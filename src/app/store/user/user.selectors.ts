import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, UserState } from './user.state';

export const selectFeature = (state: RootState) => state.users;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: UserState) => state.loading
);

export const selectSearchResults = createSelector(
  selectFeature,
  (state: UserState) => state.searchResults
);

export const selectSelectedUser = createSelector(
  selectFeature,
  (state: UserState) => state.selected
);
