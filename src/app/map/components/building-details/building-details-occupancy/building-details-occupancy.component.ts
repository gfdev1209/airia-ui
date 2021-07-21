import { Component, Input, OnInit } from '@angular/core';
import { Building } from '@map/models';

@Component({
  selector: 'app-building-details-occupancy',
  templateUrl: './building-details-occupancy.component.html',
  styleUrls: ['./building-details-occupancy.component.scss'],
})
export class BuildingDetailsOccupancyComponent {
  @Input() building?: Building | null;
  constructor() {}

  onOccupancyDateChanged(date: Date): void {
    console.log(date);
  }

  onHistoricDateRangeChanged(dateRange: Date[]): void {
    console.log(dateRange);
  }
}
