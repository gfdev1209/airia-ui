import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  heatMapChartConfig,
  HeatmapChartOptions,
} from '@shared/constants/heatmap-chart-config';
import { ChartComponent } from 'ng-apexcharts';
import * as _ from 'lodash';
import { Occupancy } from '@map/models';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-block-chart-view',
  templateUrl: './block-chart-view.component.html',
  styleUrls: ['./block-chart-view.component.scss'],
})
export class BlockChartViewComponent implements OnInit, OnChanges {
  @Input() id!: string;
  @Input() rows?: number;
  @Input() data?: any;
  @Input() showValues = true;

  @ViewChild('chart', { static: false }) chart?: ChartComponent;
  public chartOptions?: Partial<HeatmapChartOptions>;

  legendItems = Array(6)
    .fill(0)
    .map((x, i) => i);

  // data: BlockChartSeries[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      console.log(changes.data);
      this.data = changes.data.currentValue;
      this.updateChart();
    }
  }

  updateChart(): void {
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

  ngOnInit(): void {}
}

export class BlockChartData {
  x!: string;
  y!: number;
}
export class BlockChartSeries {
  name = '';
  data: any[] = [];
}
