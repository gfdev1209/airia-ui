import { IHasCoordinates, IBase } from '../interfaces';

export class Location implements IHasCoordinates, IBase {
  id!: number;
  tenantId!: number;
  name!: string;
  coordLatitude!: number;
  coordLongitude!: number;
  createdAt!: Date;
}
