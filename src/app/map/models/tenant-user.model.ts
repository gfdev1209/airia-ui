import { IBase } from '@shared/interfaces';

export class TenantUser implements IBase {
  id!: number;
  userId!: number;
  locationId!: number;
  active!: string;
  tenantId!: number;
  createdAt!: Date;

  constructor(args: {
    tenantUsersId: number;
    userId: number;
    locationId: number;
    active: string;
    createdAt: Date;
    tenantId: number;
  }) {
    this.id = args.tenantUsersId;
    this.userId = args.userId;
    this.locationId = args.locationId;
    this.active = args.active;
    this.tenantId = args.tenantId;
    this.createdAt = args.createdAt;
  }
}
