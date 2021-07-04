import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, DepartmentState } from './department.state';

export const selectFeature = (state: RootState) => state.departments;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: DepartmentState) => state.loading
);

export const selectSelectedDepartment = createSelector(
  selectFeature,
  (state: DepartmentState) => state.selected
);
