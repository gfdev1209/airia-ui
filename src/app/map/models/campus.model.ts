import { IBase, IHasCoordinates } from '../interfaces';

export class Campus implements IBase, IHasCoordinates {
  id!: number;
  name!: string;
  coordLatitude!: number;
  coordLongitude!: number;
  createdAt!: Date;
}
