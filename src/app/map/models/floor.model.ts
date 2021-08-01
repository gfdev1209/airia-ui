import { IBase } from '@shared/interfaces';

export class Floor implements IBase {
  id: number;
  buildingId!: number;
  floorId!: number;
  floorMaxOccupancy!: number;
  createdAt!: Date;

  constructor(args: {
    buildingFloorId: number;
    buildingId: number;
    floorId: number;
    floorMaxOccupancy: number;
    createdAt: Date;
  }) {
    this.id = args.buildingFloorId;
    this.buildingId = args.buildingId;
    this.floorId = args.floorId;
    this.floorMaxOccupancy = args.floorMaxOccupancy;
    this.createdAt = args.createdAt;
  }
}
