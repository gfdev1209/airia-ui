import { EventEmitter, OnChanges, Output } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AccessPointStatus } from '@map/enums';
import { AccessPoint, Building } from '@map/models';
import { EnumToSelectItemsPipe } from '@shared/pipes/enum-to-select-items.pipe';

@Component({
  selector: 'app-access-point-table-view',
  templateUrl: './access-point-table-view.component.html',
  styleUrls: ['./access-point-table-view.component.scss'],
  providers: [EnumToSelectItemsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessPointTableViewComponent implements OnChanges {
  @Input() accessPoints: AccessPoint[] | null = [];
  @Input() selectedBuilding?: Building | null;
  @Input() buildings: Building[] | null = [];
  @Input() showCheckboxColumn!: boolean;

  @Output() editAccessPoint = new EventEmitter<AccessPoint>();

  AccessPointStatusName = AccessPointStatus;

  statuses = this.enumToSelectItemsPipe.transform(AccessPointStatus);
  buildingList: any[] = [];

  constructor(private enumToSelectItemsPipe: EnumToSelectItemsPipe) {}

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
  onEdit(accessPoint: AccessPoint): void {
    this.editAccessPoint.emit(accessPoint);
  }
  onRowSelect(event: any): void {
    this.onEdit(event.data);
  }
}
