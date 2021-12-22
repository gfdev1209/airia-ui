import { AccessPointStatus } from '../enums';
import { IBase, IHasCoordinates } from '@shared/interfaces';
import { Building } from './building.model';
import { Floor } from './floor.model';

export class AccessPoint implements IBase, IHasCoordinates {
  id!: number;
  buildingId?: number;
  floorId?: number;
  floorNumber?: number;
  name!: string;
  wapmac!: string;
  status!: AccessPointStatus;
  coordLongitude!: number;
  coordLatitude!: number;
  createdAt!: Date;
  // buildingFloor?: ResponseList<Floor>;
  building?: Building;
  floor?: Floor;

  constructor(args: {
    $id: string;
    accessPointId: number;
    buildingId: number;
    buildingFloorId: number;
    accessPointName: string;
    wapmac: string;
    status: string;
    coordLatitude: number;
    coordLongitude: number;
    createdAt: Date;
    building: Building;
    buildingFloor: Floor;
  }) {
    this.id = args.accessPointId;
    this.buildingId = args.buildingId;
    this.floorId = args.buildingFloorId;
    this.floorNumber = args.buildingFloor?.floorId;
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
