import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { AccessPoint } from '@map/models';

export interface AccessPointState extends EntityState<AccessPoint> {
  selected: AccessPoint | null | undefined;
  searchResults: AccessPoint[] | null;
  loaded: boolean;
  loading: boolean;
  closeFormModal: boolean | null;
}
export const adapter = createEntityAdapter<AccessPoint>();
export const initialState: AccessPointState = adapter.getInitialState({
  selected: null,
  searchResults: [],
  loaded: false,
  loading: false,
  closeFormModal: null,
});
