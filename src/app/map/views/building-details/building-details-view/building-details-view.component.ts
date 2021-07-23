import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Building } from '@map/models';
import { slidePanelAnimation } from 'src/app/app.animations';

@Component({
  selector: 'app-building-details-view',
  templateUrl: './building-details-view.component.html',
  styleUrls: ['./building-details-view.component.scss'],
  animations: [slidePanelAnimation],
})
export class BuildingDetailsViewComponent implements OnInit {
  @Input() building?: Building | null;
  @Input() showDetails?: boolean | null = false;

  @Output() closed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onHide(): void {
    this.closed.emit();
  }
}
