import { Component, Input, OnInit } from '@angular/core';
import { AccessPoint, Building } from '@map/models';

@Component({
  selector: 'app-building-details-access-points-view',
  templateUrl: './building-details-access-points-view.component.html',
  styleUrls: ['./building-details-access-points-view.component.scss'],
})
export class BuildingDetailsAccessPointsViewComponent implements OnInit {
  @Input() building?: Building | null;
  @Input() accessPoints?: AccessPoint[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
