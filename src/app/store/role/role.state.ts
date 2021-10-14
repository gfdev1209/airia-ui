import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { UserRole } from '@map/models';

export interface RoleState extends EntityState<UserRole> {
  selected: UserRole | null;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<UserRole>();
export const initialState: RoleState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
});
