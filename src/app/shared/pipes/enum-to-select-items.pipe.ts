import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToSelectItems',
})
export class EnumToSelectItemsPipe implements PipeTransform {
  transform(value: any, useEnumValue: boolean = true): any[] {
    return Object.keys(value).map((o) => {
      return useEnumValue
        ? { value: o, label: value[o].toString().replace(/_/g, ' ') }
        : {
            value: value[o].replace(/_/g, ' '),
            label: value[o].replace(/_/g, ' '),
          };
    });
  }
}
