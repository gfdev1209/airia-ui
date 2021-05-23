import { IBase } from '../interfaces';

export class Floor implements IBase {
  id!: number;
  buildingId!: number;
  maxOccupancy!: number;
  createdAt!: Date;
}
