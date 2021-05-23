import { IBase } from '../interfaces';

export class Device implements IBase {
  id!: number;
  accessPointId!: number;
  deviceMac?: string;
  deviceManufacturer?: string;
  deviceOS?: string;
  createdAt!: Date;
}
