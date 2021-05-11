import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Alert } from 'src/app/map/models';

export interface AlertState extends EntityState<Alert> {
  selected: Alert | null;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<Alert>();
export const initialState: AlertState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
});
