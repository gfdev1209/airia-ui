import { createSelector } from '@ngrx/store';
import { RootState } from '..';
import { adapter, ReportState } from './report.state';

export const selectFeature = (state: RootState) => state.reports;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state: ReportState) => state.loading
);

export const selectSelectedReport = createSelector(
  selectFeature,
  (state: ReportState) => state.selected
);
export const selectCloseFormModal = createSelector(
  selectFeature,
  (state: ReportState) => state.closeFormModal
);
