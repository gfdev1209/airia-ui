import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Floor } from '@map/models';

export interface FloorState extends EntityState<Floor> {
  selected: Floor | null;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<Floor>();
export const initialState: FloorState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
});
