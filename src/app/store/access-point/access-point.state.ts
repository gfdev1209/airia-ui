import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { AccessPoint } from '@map/models';

export interface AccessPointState extends EntityState<AccessPoint> {
  selected: AccessPoint | null;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<AccessPoint>();
export const initialState: AccessPointState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
});
