import { Pipe, PipeTransform } from '@angular/core';
import { AlertSeverity } from 'src/app/map/enums';

@Pipe({
  name: 'colorByAlertSeverity',
})
export class ColorByAlertSeverityPipe implements PipeTransform {
  transform(alertSeverity: AlertSeverity): string {
    let color = '';
    switch (alertSeverity) {
      case AlertSeverity.Severe:
        color = 'color-red';
        break;
      case AlertSeverity.High:
        color = 'color-orange';
        break;
      case AlertSeverity.Medium:
        color = 'color-yellow';
        break;
      case AlertSeverity.Low:
        color = 'color-green';
        break;
    }
    return color;
  }
}
