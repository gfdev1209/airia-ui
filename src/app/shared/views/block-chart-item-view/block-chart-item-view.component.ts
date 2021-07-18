import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-chart-item-view',
  templateUrl: './block-chart-item-view.component.html',
  styleUrls: ['./block-chart-item-view.component.scss'],
})
export class BlockChartItemViewComponent {
  @Input() date!: Date;
  @Input() amount!: number;
  @Input() maximumAmount!: number;

  constructor() {}
}
