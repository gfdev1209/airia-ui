import { IBase } from '@shared/interfaces';
import { Role } from './role.model';

export class User implements IBase {
  id!: number;
  firstName!: string;
  lastName!: string;
  fullName!: string;
  email!: string;
  phone?: string;
  password?: string;
  departmentId?: number;
  roleId?: number;
  role?: Role;
  b2cGuid!: string;
  createdAt!: Date;

  constructor(args: {
    $id: string;
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password?: string;
    departmentId?: number;
    roleId?: number;
    b2cGuid: string;
    createdAt: Date;
    role?: Role;
  }) {
    this.id = args.userId;
    this.firstName = args.firstName;
    this.lastName = args.lastName;
    this.fullName = args.firstName + ' ' + args.lastName;
    this.email = args.email;
    this.phone = args.phone;
    this.password = args.password;
    this.departmentId = args.departmentId;
    this.roleId = args.roleId;
    if (args.role) {
      this.role = new Role(args.role as any);
    }
    this.b2cGuid = args.b2cGuid;
    this.createdAt = args.createdAt;
  }
}
