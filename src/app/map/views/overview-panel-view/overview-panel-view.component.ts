import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../models';

@Component({
  selector: 'app-overview-panel-view',
  templateUrl: './overview-panel-view.component.html',
  styleUrls: ['./overview-panel-view.component.scss'],
})
export class OverviewPanelViewComponent implements OnInit {
  @Input() client!: Client;

  expanded = true;

  footTraffic = true;
  staticDevices = true;
  accessPoints = true;

  highUrgency = true;
  medUrgency = true;
  usage = false;
  apStatus = false;
  networkHealth = false;

  alertSortOptions = [
    { name: 'Urgency', code: '1' },
    { name: 'Type', code: '2' },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleSize(): void {
    this.expanded = !this.expanded;
  }
  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }
}
