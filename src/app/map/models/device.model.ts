import { IBase } from '@shared/interfaces';

export class Device implements IBase {
  id!: number;
  accessPointId!: number;
  deviceMac?: string;
  deviceManufacturer?: string;
  deviceOS?: string;
  createdAt!: Date;

  constructor(args: {
    $id: string;
    deviceId: number;
    accessPointId: number;
    deviceMac: string;
    deviceManufacturer: string;
    deviceOS: string;
    createdAt: Date;
  }) {
    this.id = args.deviceId;
    this.accessPointId = args.accessPointId;
    this.deviceMac = args.deviceMac;
    this.deviceManufacturer = args.deviceManufacturer;
    this.deviceOS = args.deviceOS;
    this.createdAt = args.createdAt;
  }
}
