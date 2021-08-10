import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AlertSeverity, AlertType } from '@map/enums';
import { Alert, Building } from '@map/models';
import { SkipTakeInput } from '@shared/models/skip-take-input.model';
import { EnumToSelectItemsPipe } from '@shared/pipes/enum-to-select-items.pipe';
import { LazyLoadEvent } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-alert-table-view',
  templateUrl: './alert-table-view.component.html',
  styleUrls: ['./alert-table-view.component.scss'],
  providers: [EnumToSelectItemsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertTableViewComponent implements OnChanges, OnInit {
  @Input() alerts: Alert[] = [];
  @Input() loading = true;
  @Input() selectedBuilding?: Building | null;
  @Input() buildings: Building[] | null = [];
  @Input() showCheckboxColumn!: boolean;

  @Output() skipAndTake = new EventEmitter<SkipTakeInput>();

  totalRecords = 0;

  AlertSeverityName = AlertSeverity;
  AlertTypeName = AlertType;

  selectedAlerts: Alert[] = [];
  severities = this.enumToSelectItemsPipe.transform(AlertSeverity);
  alertTypes = this.enumToSelectItemsPipe.transform(AlertType);
  buildingList: any[] = [];

  constructor(private enumToSelectItemsPipe: EnumToSelectItemsPipe) {}

  ngOnInit(): void {
    this.loading = true;
  }
  loadAlerts(event: LazyLoadEvent): void {
    this.loading = true;
    if (event.first !== undefined && event.rows !== undefined) {
      this.skipAndTake.emit({ skip: event.first, take: event.rows });
    }
    // setTimeout(() => {
    //   this.customerService
    //     .getCustomers({ lazyEvent: JSON.stringify(event) })
    //     .then((res) => {
    //       this.customers = res.customers;
    //       this.totalRecords = res.totalRecords;
    //       this.loading = false;
    //     });
    // }, 1000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.alerts && !changes.alerts.firstChange) {
    //   // this.alerts = changes.alerts.currentValue;
    // }
    // Convert buildings to a basic array for multi-select
    if (!changes.buildings?.firstChange && changes.buildings?.currentValue) {
      this.buildingList = [];
      changes.buildings.currentValue.forEach((building: Building) => {
        this.buildingList.push({
          label: building.buildingName,
          value: building.id,
        });
      });
    }
  }

  selectAlert(alert: Alert): void {
    console.log('selected', alert);
  }
}
