import { Pipe, PipeTransform } from '@angular/core';
import { AlertSeverity } from 'src/app/map/enums';

@Pipe({
  name: 'colorByAlertSeverity',
})
export class ColorByAlertSeverityPipe implements PipeTransform {
  transform(alertSeverity: AlertSeverity): string {
    let color = '';
    switch (alertSeverity) {
      case AlertSeverity.Red:
        color = 'color-red';
        break;
      case AlertSeverity.Orange:
        color = 'color-orange';
        break;
      case AlertSeverity.Yellow:
        color = 'color-yellow';
        break;
      case AlertSeverity.White:
        color = 'color-green';
        break;
    }
    return color;
  }
}
