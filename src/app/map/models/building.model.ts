import { Floor } from '.';
import { IBase, IHasCoordinates } from '../interfaces';

export class Building implements IBase, IHasCoordinates {
  id!: number;
  locationId!: number;
  mapboxId!: number;
  name!: string;
  classification?: string;
  description?: string;
  coordLatitude!: number;
  coordLongitude!: number;
  floors!: Floor[];
  createdAt!: Date;
}
