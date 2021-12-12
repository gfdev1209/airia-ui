import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  heatMapChartConfig,
  HeatmapChartOptions,
} from '@shared/constants/heatmap-chart-config';
import { ChartComponent } from 'ng-apexcharts';

import { cloneDeep } from 'lodash';
import * as _ from 'lodash';

@Component({
  selector: 'app-block-chart-view',
  templateUrl: './block-chart-view.component.html',
  styleUrls: ['./block-chart-view.component.scss'],
})
export class BlockChartViewComponent implements OnInit {
  @Input() id!: string;
  @Input() data!: any[];
  @Input() showValues = true;

  @ViewChild('chart', { static: false }) chart?: ChartComponent;
  public chartOptions?: Partial<HeatmapChartOptions>;

  legendItems = Array(6)
    .fill(0)
    .map((x, i) => i);

  constructor() {}

  ngOnInit(): void {
    const chartOptions2 = _.cloneDeep(heatMapChartConfig);
    chartOptions2.series = this.data;
    chartOptions2.chart.redrawOnParentResize = true;
    chartOptions2.chart.height = 66 + (this.data.length + 1) * 18;
    if (!this.showValues) {
      chartOptions2.dataLabels.enabled = false;
    }
    this.chartOptions = chartOptions2;
    // height: 66 + (2*18),
    this.chart?.updateOptions(chartOptions2, true);
  }
}
