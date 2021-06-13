import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
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
export class AlertTableViewComponent implements OnChanges {
  @Input() alerts: Alert[] | null = [];
  @Input() buildings: Building[] | null = [];

  alerts2: Alert[] = [
    {
      id: 1,
      severity: AlertSeverity.High,
      type: AlertType.Access_Point_Offline,
      message: 'test',
      createdAt: new Date(),
    },
  ];

  AlertSeverityName = AlertSeverity;
  AlertTypeName = AlertType;

  selectedAlerts: Alert[] = [];
  severities = this.enumToSelectItemsPipe.transform(AlertSeverity);
  alertTypes = this.enumToSelectItemsPipe.transform(AlertType);
  buildingList: any[] = [];

  constructor(private enumToSelectItemsPipe: EnumToSelectItemsPipe) {
    console.log(this.alerts);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Convert buildings to a basic array for multi-select
    if (!changes.buildings?.firstChange && changes.buildings?.currentValue) {
      this.buildingList = [];
      changes.buildings.currentValue.forEach((building: Building) => {
        this.buildingList.push({
          label: building.name,
          value: building.id,
        });
      });
    }
  }

  selectAlert(alert: Alert): void {
    console.log('selected', alert);
  }
}
