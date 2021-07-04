import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, RoleState } from './role.state';

export const selectFeature = (state: RootState) => state.roles;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: RoleState) => state.loading
);

export const selectSelectedRole = createSelector(
  selectFeature,
  (state: RoleState) => state.selected
);
