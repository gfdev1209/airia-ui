import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underscoreToSpace',
})
export class UnderscoreToSpacePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value && value.lenght > 0 ? value.replace(/_/g, ' ') : value;
  }
}
