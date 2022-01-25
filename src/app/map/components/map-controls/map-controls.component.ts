import { Component, OnInit } from '@angular/core';
import { MapService } from '@map/services/map.service';

@Component({
  selector: 'app-map-controls',
  templateUrl: './map-controls.component.html',
  styleUrls: ['./map-controls.component.scss'],
})
export class MapControlsComponent {
  isDrawing$ = this.mapService.isDrawing$;

  constructor(private mapService: MapService) {}

  onZoomIn(): void {
    this.mapService.mapZoomIn();
  }
  onZoomOut(): void {
    this.mapService.mapZoomOut();
  }
  onToggleOverview(): void {
    this.mapService.toggleOverview();
  }
  onToggleDraw(): void {
    this.mapService.setDrawing(true);
  }
  onToggleDelete(): void {
    this.mapService.onDeleteDrawing();
  }
}
