import { IBase, IHasCoordinates } from '../interfaces';

export class Client implements IBase, IHasCoordinates {
  id!: number;
  createdAt!: Date;
  name!: string;
  coordLatitude!: number;
  coordLongitude!: number;
}
