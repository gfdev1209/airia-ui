import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@map/models';

export interface UserState extends EntityState<User> {
  selected: User | null;
  searchResults: User[] | null;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<User>();
export const initialState: UserState = adapter.getInitialState({
  selected: null,
  searchResults: [],
  loaded: false,
  loading: false,
});
