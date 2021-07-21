import { Component, Input, OnInit } from '@angular/core';
import { Building } from '@map/models';

@Component({
  selector: 'app-building-details-alerts',
  templateUrl: './building-details-alerts.component.html',
  styleUrls: ['./building-details-alerts.component.scss'],
})
export class BuildingDetailsAlertsComponent implements OnInit {
  @Input() building?: Building | null;

  constructor() {}

  ngOnInit(): void {}
}
