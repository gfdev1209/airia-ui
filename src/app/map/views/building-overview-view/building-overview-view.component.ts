import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AccessPointStatus } from '@map/enums';
import { AccessPoint, Building, Floor } from '@map/models';

@Component({
  selector: 'app-building-overview-view',
  templateUrl: './building-overview-view.component.html',
  styleUrls: ['./building-overview-view.component.scss'],
})
export class BuildingOverviewViewComponent implements OnInit, OnChanges {
  @Input() building?: Building | null;
  @Input() show?: boolean | null = false;

  @Output() closePanel = new EventEmitter();
  @Output() showDetails = new EventEmitter<boolean>();

  accessPointsOnline = 0;
  accessPointsOffline = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.building?.currentValue) {
      if (changes.building.currentValue.buildingFloors?.length > 0) {
        this.accessPointsOffline = 0;
        this.accessPointsOnline = 0;
        changes.building.currentValue.buildingFloors.forEach((floor: Floor) => {
          if (floor?.accessPoints) {
            floor.accessPoints.forEach((accessPoint: AccessPoint) => {
              if (accessPoint) {
                if (accessPoint.status === AccessPointStatus.Online) {
                  ++this.accessPointsOnline;
                } else if (accessPoint.status === AccessPointStatus.Offline) {
                  ++this.accessPointsOffline;
                }
              }
            });
          }
        });
      }
    }
  }

  ngOnInit(): void {}

  onClose(): void {
    this.closePanel.emit();
  }
  onViewDetails(): void {
    this.showDetails.emit(true);
  }
}
