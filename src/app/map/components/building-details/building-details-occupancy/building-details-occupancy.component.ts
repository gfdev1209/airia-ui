import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-building-details-occupancy',
  templateUrl: './building-details-occupancy.component.html',
  styleUrls: ['./building-details-occupancy.component.scss'],
})
export class BuildingDetailsOccupancyComponent {
  constructor() {}

  onOccupancyDateChanged(date: Date): void {
    console.log(date);
  }

  onHistoricDateRangeChanged(dateRange: Date[]): void {
    console.log(dateRange);
  }
}
