import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Report } from 'src/app/report/models';

export interface ReportState extends EntityState<Report> {
  selected: Report | null;
  loaded: boolean;
  loading: boolean;
  closeFormModal: boolean | null;
}
export const adapter = createEntityAdapter<Report>();
export const initialState: ReportState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
  closeFormModal: null,
});
