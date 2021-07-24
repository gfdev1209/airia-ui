import { Component, Input, OnInit } from '@angular/core';
import { Building } from '@map/models';

@Component({
  selector: 'app-building-details-alerts-view',
  templateUrl: './building-details-alerts-view.component.html',
  styleUrls: ['./building-details-alerts-view.component.scss'],
})
export class BuildingDetailsAlertsViewComponent implements OnInit {
  @Input() building?: Building | null;

  constructor() {}

  ngOnInit() {}
}
