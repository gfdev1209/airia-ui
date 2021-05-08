import { Pipe, PipeTransform } from '@angular/core';
import { AlertType } from 'src/app/map/enums';

@Pipe({
  name: 'alertIconByType',
})
export class AlertIconByTypePipe implements PipeTransform {
  transform(alertType: AlertType): string {
    let alertIcon = '';
    switch (alertType) {
      case AlertType.Covid_Capacity:
      case AlertType.High_Capacity:
      case AlertType.Low_Capacity:
        alertIcon = 'fas fa-exclamation-triangle';
        break;
      case AlertType.Network_Health:
        alertIcon = 'fas fa-wifi';
        break;
      case AlertType.Access_Point_Online:
      case AlertType.Access_Point_Offline:
        alertIcon = 'fas fa-router';
        break;
    }
    return alertIcon;
  }
}
