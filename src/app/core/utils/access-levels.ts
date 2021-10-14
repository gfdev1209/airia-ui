import { Role } from '@map/enums/role.enum';

export default class AccessLevels {
  static CanEdit = [Role.Owner];
  static CanDelete = [Role.Owner];

  static roleHasAccessLevel(roleName: any, role: Role[]): boolean {
    const typedRoleString: keyof typeof Role = roleName;
    return role.some((r) => r === typedRoleString);
  }
}
