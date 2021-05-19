import { IBase, IHasCoordinates } from '../interfaces';

export class Building implements IBase, IHasCoordinates {
  id!: number;
  createdAt!: Date;
  clientId!: number;
  mapboxId!: number;
  name!: string;
  maxOccupancy!: number;
  floors!: number;
  coordLatitude!: number;
  coordLongitude!: number;
}
