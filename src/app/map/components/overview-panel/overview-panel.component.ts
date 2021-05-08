import { Component, OnInit } from '@angular/core';
import { Client } from '../../models';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrls: ['./overview-panel.component.scss'],
})
export class OverviewPanelComponent implements OnInit {
  client: Client = {
    id: 1,
    name: 'University Campus',
    coordLatitude: 123.23,
    coordLongitude: 12.32,
    createdAt: new Date(),
  };

  constructor(private mapService: MapService) {}

  ngOnInit(): void {}

  onTopPanelHeightChanged(height: number): void {
    this.mapService.updateOverviewPanelHeight(height);
  }
}
