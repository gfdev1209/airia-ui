import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-chart-view',
  templateUrl: './block-chart-view.component.html',
  styleUrls: ['./block-chart-view.component.scss'],
})
export class BlockChartViewComponent {
  @Input() data!: any[];
  @Input() maximumAmount!: number;

  legendItems = Array(6)
    .fill(0)
    .map((x, i) => i);

  constructor() {}
}
