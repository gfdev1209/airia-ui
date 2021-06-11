import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AlertSeverity, AlertType } from '@map/enums';
import { Alert, Building } from '@map/models';
import { EnumToSelectItemsPipe } from '@shared/pipes/enum-to-select-items.pipe';

@Component({
  selector: 'app-alert-table-view',
  templateUrl: './alert-table-view.component.html',
  styleUrls: ['./alert-table-view.component.scss'],
  providers: [EnumToSelectItemsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertTableViewComponent {
  @Input() alerts: Alert[] | null = [];
  @Input() buildings: Building[] = [];

  AlertSeverityName = AlertSeverity;
  AlertTypeName = AlertType;

  selectedAlerts: Alert[] = [];
  severities = this.enumToSelectItemsPipe.transform(AlertSeverity);
  alertTypes = this.enumToSelectItemsPipe.transform(AlertType);

  constructor(private enumToSelectItemsPipe: EnumToSelectItemsPipe) {}

  selectAlert(alert: Alert): void {
    console.log('selected', alert);
  }
}
