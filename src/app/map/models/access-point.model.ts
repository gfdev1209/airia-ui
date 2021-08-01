import { AccessPointStatus } from '../enums';
import { IBase, IHasCoordinates } from '@shared/interfaces';
import { Building, Floor } from '.';

export class AccessPoint implements IBase, IHasCoordinates {
  id!: number;
  buildingId?: number;
  floorId?: number;
  name!: string;
  wapmac!: string;
  status!: AccessPointStatus;
  coordLongitude!: number;
  coordLatitude!: number;
  createdAt!: Date;
  building?: Building;
  floor?: Floor;

  constructor(args: {
    $id: string;
    accessPointId: number;
    buildingId: number;
    floorId: number;
    accessPointName: string;
    wapmac: string;
    status: number;
    coordLatitude: number;
    coordLongitude: number;
    createdAt: Date;
    building: Building;
    buildingFloor: Floor;
  }) {
    this.id = args.accessPointId;
    this.buildingId = args.buildingId;
    this.floorId = args.floorId;
    this.name = args.accessPointName;
    this.wapmac = args.wapmac;
    this.status = args.status as AccessPointStatus;
    this.coordLongitude = args.coordLongitude;
    this.coordLatitude = args.coordLatitude;
    this.createdAt = args.createdAt;
    this.building = args.building;
    this.floor = args.buildingFloor;
  }
}
