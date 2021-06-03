import { Component, OnInit } from '@angular/core';
import { MapService } from '@map/services/map.service';

@Component({
  selector: 'app-zoom-controls',
  templateUrl: './zoom-controls.component.html',
  styleUrls: ['./zoom-controls.component.scss'],
})
export class ZoomControlsComponent {
  constructor(private mapService: MapService) {}

  onZoomIn(): void {
    this.mapService.mapZoomIn();
  }
  onZoomOut(): void {
    this.mapService.mapZoomOut();
  }
}
