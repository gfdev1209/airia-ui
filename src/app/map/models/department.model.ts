import { IBase } from '@shared/interfaces';

export class Department implements IBase {
  id!: number;
  name!: string;
  createdAt!: Date;

  constructor(args: {
    departmentId: number;
    departmentName: string;
    createdAt: Date;
  }) {
    this.id = args.departmentId;
    this.name = args.departmentName;
    this.createdAt = args.createdAt;
  }
}
