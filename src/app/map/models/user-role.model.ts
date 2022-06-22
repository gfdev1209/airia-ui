import { IBase } from '@shared/interfaces';

export class UserRole implements IBase {
  id!: number;
  name!: string;
  createdAt!: Date;
  userId?:number;

  constructor(args: { roleId: number; roleName: string; createdAt: Date; userId:number }) {
    this.id = args.roleId;
    this.name = args.roleName;
    this.createdAt = args.createdAt;
    this.userId = args.userId;
  }
}
