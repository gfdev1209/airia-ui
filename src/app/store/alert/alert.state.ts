import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { AlertSortType } from 'src/app/map/enums';
import { Alert } from 'src/app/map/models';

export interface AlertState extends EntityState<Alert> {
  selected: Alert | null;
  loaded: boolean;
  loading: boolean;
  sortType: AlertSortType;
}
export const adapter = createEntityAdapter<Alert>();
export const initialState: AlertState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
  sortType: AlertSortType.Date,
});
