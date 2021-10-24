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

  @Output() skipAndTake = new EventEmitter<SkipTakeInput>();
  @Output() alertSelected = new EventEmitter<Alert>();
  @Output() alertDeselected = new EventEmitter<Alert>();

  totalRecords = 0;
  rows = 10;

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
  ngOnChanges(changes: SimpleChanges): void {
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
    if (!changes.alerts?.firstChange && changes.alerts?.currentValue) {
      this.loading = false;
      this.totalRecords = 30;
    }
  }

  loadAlerts(event: LazyLoadEvent): void {
    this.loading = true;
    console.log(event);
    const skipTakeInput = new SkipTakeInput(0, this.rows);
    skipTakeInput.parameters = { sortOrder: -1 };
    if (event.rows) {
      this.rows = event.rows;
      skipTakeInput.take = event.rows;
    }
    if (event.first) {
      skipTakeInput.skip = event.first;
    }
    if (event.sortOrder) {
      skipTakeInput.parameters.sortOrder = event.sortOrder;
    }
    if (event.sortField) {
      skipTakeInput.parameters.sortField = event.sortField;
    }
    this.skipAndTake.emit(skipTakeInput);

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
