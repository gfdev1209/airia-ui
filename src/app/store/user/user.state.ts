import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@map/models';

export interface UserState extends EntityState<User> {
  self: User | null;
  selected: User | null;
  searchResults: User[] | null;
  loaded: boolean;
  loading: boolean;
  updatedUser:User | null;
}
export const adapter = createEntityAdapter<User>();
export const initialState: UserState = adapter.getInitialState({
  self: null,
  selected: null,
  searchResults: [],
  loaded: false,
  loading: false,
  updatedUser: null,
});
