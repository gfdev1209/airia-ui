import { IBase } from '@shared/interfaces';
import { Role } from '.';

export class User implements IBase {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  phone?: string;
  password?: string;
  departmentId?: number;
  roleId?: number;
  role?: Role;
  b2cGuid!: string;
  createdAt!: Date;

  constructor(args: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password?: string;
    departmentId?: number;
    roleId?: number;
    role?: Role;
    b2cGuid: string;
    createdAt: Date;
  }) {
    this.id = args.userId;
    this.firstName = args.firstName;
    this.lastName = args.lastName;
    this.email = args.email;
    this.phone = args.phone;
    this.password = args.password;
    this.departmentId = args.departmentId;
    this.roleId = args.roleId;
    this.role = args.role;
    this.b2cGuid = args.b2cGuid;
    this.createdAt = args.createdAt;
  }
}
