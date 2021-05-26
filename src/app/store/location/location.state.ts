import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Location } from '@map/models';

export interface LocationState extends EntityState<Location> {
  selected: Location | null;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<Location>();
export const initialState: LocationState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
});
