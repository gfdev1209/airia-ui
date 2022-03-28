import { Component, OnInit } from '@angular/core';
import { MapService } from '@map/services/map.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-map-layout',
  templateUrl: './map-layout.component.html',
  styleUrls: ['./map-layout.component.scss'],
})
export class MapLayoutComponent {
  isDrawing$ = this.mapService.isDrawing$
    .pipe(tap((isDrawing) => (this.isDrawing = isDrawing)))
    .subscribe();
  isDrawing?: boolean | null;
  constructor(private mapService: MapService) {}
}
