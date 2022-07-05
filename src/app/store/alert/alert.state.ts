import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { AlertSortType } from '@map/enums';
import { Alert } from '@map/models';

export interface AlertState extends EntityState<Alert> {
  selected: Alert | null;
  loaded: boolean;
  loading: boolean;
  sortType: AlertSortType;
  sortDirection: number;
  sortField: string | null;
  pinnedAlert:Alert[] | null;
}
export const adapter = createEntityAdapter<Alert>();
export const initialState: AlertState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
  sortType: AlertSortType.Date,
  sortDirection: -1,
  sortField: null,
  pinnedAlert:[]
});
