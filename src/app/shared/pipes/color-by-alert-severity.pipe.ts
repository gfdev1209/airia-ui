import { Pipe, PipeTransform } from '@angular/core';
import { AlertSeverity } from 'src/app/map/enums';

@Pipe({
  name: 'colorByAlertSeverity',
})
export class ColorByAlertSeverityPipe implements PipeTransform {
  transform(alertSeverity: AlertSeverity): string {
    return '#ff00ff';
  }
}
