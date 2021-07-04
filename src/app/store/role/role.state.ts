import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Role } from '@map/models';

export interface RoleState extends EntityState<Role> {
  selected: Role | null;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<Role>();
export const initialState: RoleState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
});
