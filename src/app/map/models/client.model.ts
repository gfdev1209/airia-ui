import { IBase } from '../interfaces';

export class Client implements IBase {
  id!: number;
  createdAt!: Date;
  name!: string;
  coordLatitude!: number;
  coordLongitude!: number;
}
