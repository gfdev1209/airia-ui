import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Floor } from '@map/models';

export interface FloorState extends EntityState<Floor> {
  selected: Floor | null;
  selectedFloorNumber: number | null;
  loaded: boolean;
  loading: boolean;
  closeFormModal: boolean | null;
}
export const adapter = createEntityAdapter<Floor>();
export const initialState: FloorState = adapter.getInitialState({
  selected: null,
  selectedFloorNumber: null,
  loaded: false,
  loading: false,
  closeFormModal: null,
});
