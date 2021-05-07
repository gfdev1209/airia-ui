import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrls: ['./overview-panel.component.scss'],
})
export class OverviewPanelComponent implements OnInit {
  expanded = true;

  constructor() {}

  ngOnInit(): void {}

  toggleSize(): void {
    this.expanded = !this.expanded;
  }
}
