import { IBase } from '@shared/interfaces';
import { Department } from './department.model';
import { UserRole } from './user-role.model';
import { UserPreferences } from './user.preferences.model';

export class User implements IBase {
  id!: number;
  firstName!: string;
  lastName!: string;
  fullName!: string;
  email!: string;
  phone?: string;
  password?: string;
  departmentId?: number;
  department?: Department;
  roleId?: number;
  role?: UserRole;
  b2cGuid!: string;
  createdAt!: Date;
  userPreferences!:UserPreferences;
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
    department?: Department;
    role?: UserRole;
    userPreferences:UserPreferences
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
      this.role = new UserRole(args.role as any);
    }
    if (args.department) {
      this.department = new Department(args.department as any);
    }
    this.b2cGuid = args.b2cGuid;
    this.createdAt = args.createdAt;
    this.userPreferences = args.userPreferences;
  }
}
