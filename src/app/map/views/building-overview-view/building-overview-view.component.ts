import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Building } from '@map/models';

@Component({
  selector: 'app-building-overview-view',
  templateUrl: './building-overview-view.component.html',
  styleUrls: ['./building-overview-view.component.scss'],
})
export class BuildingOverviewViewComponent implements OnInit {
  @Input() building?: Building | null;
  @Input() show?: boolean | null = false;

  @Output() closePanel = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose(): void {
    this.closePanel.emit();
  }
}
