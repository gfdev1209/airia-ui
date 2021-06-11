import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underscoreToSpace',
})
export class UnderscoreToSpacePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value ? value.replace(/_/g, ' ') : value;
  }
}
