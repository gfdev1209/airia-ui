import * as moment from 'moment';
import { environment } from 'src/environments/environment';
export default class Helpers {
    static getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

    static stringIsNumber = (value: any) => isNaN(Number(value)) === false;

    static filterArrayBy<T>(array: T[], parameter: string, value: string, includesParameter: boolean): T[] {
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
        return new Date(date.getTime() - date.getTimezoneOffset() * offset).toJSON();
    }

    /** Converts the date from UTC to the timezone of the environment */
    static utcDateToEnvironmentDate(date: Date | string): Date {
        return new Date(moment.tz(date, 'UTC').tz(environment.timeZone).format('YYYY/MM/DD HH:mm:ss'));
    }
    static utcDateToLocalDate(date: Date | string): Date {
        return new Date(moment.tz(date, 'UTC').tz(moment.tz.guess()).format('YYYY/MM/DD HH:mm:ss'));
    }

    static isLive(date: Date): boolean {
        return moment(date).isSame(new Date(), 'date');
    }
}
