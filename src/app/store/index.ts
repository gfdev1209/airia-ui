import { ActionReducerMap } from '@ngrx/store';
import { alertReducer } from './alert/alert.reducer';
import { AlertState } from './alert/alert.state';
import { buildingReducer } from './building/building.reducer';
import { BuildingState } from './building/building.state';
import { locationReducer } from './location/location.reducer';
import { LocationState } from './location/location.state';
import { floorReducer } from './floor/floor.reducer';
import { FloorState } from './floor/floor.state';
import { AccessPointState } from './access-point/access-point.state';
import { accessPointReducer } from './access-point/access-point.reducer';
import { DeviceState } from './device/device.state';
import { deviceReducer } from './device/device.reducer';
import { UserState } from './user/user.state';
import { userReducer } from './user/user.reducer';
import { DepartmentState } from './department/department.state';
import { departmentReducer } from './department/department.reducers';

export interface RootState {
  alerts: AlertState;
  locations: LocationState;
  buildings: BuildingState;
  floors: FloorState;
  devices: DeviceState;
  accessPoints: AccessPointState;
  users: UserState;
  departments: DepartmentState;
}
export const reducers: ActionReducerMap<RootState> = {
  alerts: alertReducer,
  locations: locationReducer,
  buildings: buildingReducer,
  floors: floorReducer,
  devices: deviceReducer,
  accessPoints: accessPointReducer,
  users: userReducer,
  departments: departmentReducer,
};
