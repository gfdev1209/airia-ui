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
  @Output() alertSelected = new EventEmitter<Alert>();
  @Output() alertDeselected = new EventEmitter<Alert>();

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
}
