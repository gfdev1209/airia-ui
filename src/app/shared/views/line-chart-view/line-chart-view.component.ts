import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { chartOptionsConfig, LineChartOptions } from '@shared/constants';
import * as _ from 'lodash';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-line-chart-view',
  templateUrl: './line-chart-view.component.html',
  styleUrls: ['./line-chart-view.component.scss'],
})
export class LineChartViewComponent implements OnInit, OnChanges {
  @ViewChild('chart', { static: false }) chart?: ChartComponent;
  public chartOptions?: Partial<LineChartOptions>;

  @Input() chartData?: any | null;
  maxDateValue = new Date();
  occupancyDate: Date = new Date();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData?.currentValue) {
      console.log('update graph', changes.chartData.currentValue);
      this.updateChart();
    }
  }

  updateChart(): void {
    if (this.chartData) {
      const chartOptions2 = _.cloneDeep(chartOptionsConfig);
      chartOptions2.series[0].data = this.chartData.series;
      chartOptions2.labels = this.chartData.labels;
      chartOptions2.chart.redrawOnParentResize = true;
      chartOptions2.chart.height = 120;
      chartOptions2.chart.offsetY = -10;
      chartOptions2.chart.type = 'area';
      chartOptions2.chart.background = 'transparent';
      chartOptions2.annotations = undefined;

      if (!this.chartData.usePercentage) {
        chartOptions2.dataLabels.formatter = (val: any) => val?.toFixed(0);
        if (chartOptions2.yaxis.labels?.formatter) {
          chartOptions2.yaxis.labels.formatter = (val: any) => val?.toFixed(0);
        }
        chartOptions2.tooltip.y.formatter = (val: any) => val?.toFixed(0);
      }
      if (this.chartData.tooltipTitle) {
        chartOptions2.tooltip.y.title.formatter = (val: any) =>
          this.chartData.tooltipTitle;
      }
      // if (!Helpers.isLive(this.date)) {
      //   chartOptions2.annotations = undefined;
      // } else if (chartOptions2.annotations?.xaxis) {
      //   chartOptions2.annotations.xaxis[0].x = this.chartData.liveTime.getTime();
      // }
      this.chartOptions = chartOptions2;
      this.chart?.updateOptions(chartOptions2, true);
    }
  }
}
