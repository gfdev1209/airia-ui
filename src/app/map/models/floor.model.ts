import { IBase } from '@shared/interfaces';
import { ResponseList } from '@shared/models';
import { AccessPoint } from './access-point.model';

export class Floor implements IBase {
  id: number;
  buildingId!: number;
  floorId!: number;
  floorMaxOccupancy!: number;
  createdAt!: Date;
  accessPoints?: AccessPoint[];

  constructor(args: {
    buildingFloorId: number;
    buildingId: number;
    floorId: number;
    floorMaxOccupancy: number;
    createdAt: Date;
    accessPoints: ResponseList<AccessPoint>;
  }) {
    this.id = args.buildingFloorId;
    this.buildingId = args.buildingId;
    this.floorId = args.floorId;
    this.floorMaxOccupancy = args.floorMaxOccupancy;
    this.createdAt = args.createdAt;
    if (args.accessPoints?.$values) {
      this.accessPoints = args.accessPoints.$values.map(
        (responseJson: any) => new AccessPoint(responseJson)
      );
    }
  }
}
