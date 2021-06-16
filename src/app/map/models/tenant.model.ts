import { IBase } from '@shared/interfaces';

export class Tenant implements IBase {
  id!: number;
  name!: string;
  createdAt!: Date;

  constructor(args: { tenantId: number; tenantName: string; createdAt: Date }) {
    this.id = args.tenantId;
    this.name = args.tenantName;
    this.createdAt = args.createdAt;
  }
}
