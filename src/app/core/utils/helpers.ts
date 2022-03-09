import * as moment from 'moment';
export default class Helpers {
  static getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

  static stringIsNumber = (value: any) => isNaN(Number(value)) === false;

  static filterArrayBy<T>(
    array: T[],
    parameter: string,
    value: string,
    includesParameter: boolean
  ): T[] {
    if (array) {
      return array?.filter((d) => {
        const getValue = Helpers.getKeyValue(parameter)(d);
        if (getValue) {
          return includesParameter
            ? getValue.toLowerCase().includes(value.toLowerCase())
            : !getValue.toLowerCase().includes(value.toLowerCase());
        }
      });
    }
    return [];
  }

  static formatDateToJSON(date: Date, addGMTOffset: boolean = true): string {
    return moment.parseZone(date).utc().format();
    const offset = addGMTOffset ? 60000 : 1;
    return new Date(
      date.getTime() - date.getTimezoneOffset() * offset
    ).toJSON();
  }

  static isLive(date: Date): boolean {
    return moment(date).isSame(new Date(), 'date');
  }
}
