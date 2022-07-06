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

export const selectSelf = createSelector(
  selectFeature,
  (state: UserState) => state.self
);

export const selectSelectedUser = createSelector(
  selectFeature,
  (state: UserState) => state.selected
);

export const selectUpdatedUser = createSelector(
  selectFeature,
  (state: UserState) => state.updatedUser
);
