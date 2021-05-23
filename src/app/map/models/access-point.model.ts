import { AccessPointStatus } from '../enums';
import { IBase, IHasCoordinates } from '../interfaces';

export class AccessPoint implements IBase, IHasCoordinates {
  id!: number;
  createdAt!: Date;
  buildingId!: number;
  name!: string;
  wapmac?: string;
  status!: AccessPointStatus;
  coordLongitude!: number;
  coordLatitude!: number;
}
