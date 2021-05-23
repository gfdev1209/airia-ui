import { IBase } from '../interfaces';

export class Tenant implements IBase {
  id!: number;
  name!: string;
  createdAt!: Date;
}
