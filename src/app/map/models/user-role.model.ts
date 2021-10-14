import { IBase } from '@shared/interfaces';

export class UserRole implements IBase {
  id!: number;
  name!: string;
  createdAt!: Date;

  constructor(args: { roleId: number; roleName: string; createdAt: Date }) {
    this.id = args.roleId;
    this.name = args.roleName;
    this.createdAt = args.createdAt;
  }
}
