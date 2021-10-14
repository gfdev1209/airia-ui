import { Pipe, PipeTransform } from '@angular/core';
import AccessLevels from '@core/utils/access-levels';
import { Role } from '@map/enums/role.enum';

@Pipe({
  name: 'hasAccessLevel',
})
export class HasAccessLevelPipe implements PipeTransform {
  transform(roleName: string, roles: Role[]): boolean {
    return AccessLevels.roleHasAccessLevel(roleName, roles);
  }
}
