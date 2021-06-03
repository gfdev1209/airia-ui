import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-zoom-controls-view',
  templateUrl: './zoom-controls-view.component.html',
  styleUrls: ['./zoom-controls-view.component.scss'],
})
export class ZoomControlsViewComponent {
  @Output() zoomIn = new EventEmitter();
  @Output() zoomOut = new EventEmitter();

  constructor() {}

  onZoomIn(): void {
    this.zoomIn.emit();
  }
  onZoomOut(): void {
    this.zoomOut.emit();
  }
}
