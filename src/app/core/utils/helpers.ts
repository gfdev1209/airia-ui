export default class Helpers {
  static getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

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
}
