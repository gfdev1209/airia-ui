import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-map-controls-view',
  templateUrl: './map-controls-view.component.html',
  styleUrls: ['./map-controls-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapControlsViewComponent {
  @Input() isDrawing: boolean | null = false;

  @Output() zoomIn = new EventEmitter();
  @Output() zoomOut = new EventEmitter();
  @Output() centerMap = new EventEmitter();
  @Output() toggleOverview = new EventEmitter();
  @Output() toggleDraw = new EventEmitter();
  @Output() toggleDelete = new EventEmitter();

  constructor() {}

  onZoomIn(): void {
    this.zoomIn.emit();
  }
  onZoomOut(): void {
    this.zoomOut.emit();
  }
  onCenter(): void {
    this.centerMap.emit();
  }
  onToggleOverview(): void {
    this.toggleOverview.emit();
  }
  onToggleDraw(): void {
    this.toggleDraw.emit();
  }
  onToggleDelete(): void {
    this.toggleDelete.emit();
  }
}
