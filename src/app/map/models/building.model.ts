import { IBase } from '../interfaces';

export class Building implements IBase {
  id!: number;
  createdAt!: Date;
  clientId!: number;
  mapboxId!: number;
  name!: string;
  maxOccupancy!: number;
  floors!: number;
}
