import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Department } from '@map/models';

export interface DepartmentState extends EntityState<Department> {
  selected: Department | null;
  loaded: boolean;
  loading: boolean;
}
export const adapter = createEntityAdapter<Department>();
export const initialState: DepartmentState = adapter.getInitialState({
  selected: null,
  loaded: false,
  loading: false,
});
