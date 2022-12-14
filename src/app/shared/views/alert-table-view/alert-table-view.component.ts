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
import Helpers from '@core/utils/helpers';
import { AlertSeverity, AlertType } from '@map/enums';
import { Alert, Building } from '@map/models';
import { SkipTakeInput } from '@shared/models/skip-take-input.model';
import { EnumToSelectItemsPipe } from '@shared/pipes/enum-to-select-items.pipe';
import { LazyLoadEvent } from 'primeng/api';
import { first, skip } from 'rxjs/operators';

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
  @Input() rows = 10;
  @Input() totalRows = 0;

  @Output() lazyLoad = new EventEmitter<LazyLoadEvent>();
  @Output() alertSelected = new EventEmitter<Alert>();
  @Output() alertDeselected = new EventEmitter<Alert>();
  @Output() rowAmountChanged = new EventEmitter<number>();

  // totalRecords = 0;
  // rows = 10;

  AlertSeverityName = AlertSeverity;
  AlertTypeName = AlertType;

  selectedAlerts: Alert[] = [];
  // severities = this.enumToSelectItemsPipe.transform(AlertSeverity);
  severities = Object.keys(AlertSeverity).map((o) => {
    return {
      value: o,
      label: AlertSeverity[o],
    };
  });
  alertTypes = this.enumToSelectItemsPipe.transform(AlertType);
  buildingList: any[] = [];

  buildingDictionary = new Map<number, Building>();

  constructor(private enumToSelectItemsPipe: EnumToSelectItemsPipe) {}

  ngOnInit(): void {
    this.loading = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Convert buildings to a basic array for multi-select
    if (!changes.buildings?.firstChange && changes.buildings?.currentValue) {
      this.buildingList = [];
      changes.buildings.currentValue.forEach((building: Building) => {
        this.buildingDictionary.set(building.id, building);
        this.buildingList.push({
          label: building.buildingName,
          value: building.id,
        });
      });
    }
    if (!changes.alerts?.firstChange && changes.alerts?.currentValue) {
      this.loading = false;
    }
  }

  onPageChange(event: any): void {
    this.rowAmountChanged.emit(event.rows);
  }

  loadAlerts(event: LazyLoadEvent): void {
    this.loading = true;
    console.log(event);
    this.lazyLoad.emit(event);

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

  selectAlert(event: any): void {
    if (event?.data) {
      this.alertSelected.emit(event.data);
    }
  }
  deselectAlert(event: any): void {
    if (event?.data) {
      this.alertDeselected.emit(event.data);
    }
  }

  sortAlerts(event: any): void {
    console.log(event);
  }
}
