import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Location, Occupancy } from '../../models';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexGrid,
  ApexFill,
  ApexAnnotations,
  ApexTheme,
  ApexTooltip,
} from 'ng-apexcharts';
import * as _ from 'lodash';
import {
  chartOptionsConfig,
  LineChartOptions,
} from '@shared/constants/line-chart-config';
import * as moment from 'moment';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  grid: ApexGrid;
  fill: ApexFill;
  annotations: ApexAnnotations;
  theme: ApexTheme;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-analytics-panel-view',
  templateUrl: './analytics-panel-view.component.html',
  styleUrls: ['./analytics-panel-view.component.scss'],
})
export class AnalyticsPanelViewComponent implements OnInit, OnChanges {
  @Input() isExpanded: boolean | null = true;
  @Input() date?: Date | null;
  @Input() selectedLocation!: Location | null;

  @Input() occupancy?: Occupancy | null;
  @Input() loading?: boolean | null;

  @Output() toggleExpanded = new EventEmitter<boolean>();

  @Output() dateChanged = new EventEmitter<Date>();

  @ViewChild('chart', { static: false }) chart?: ChartComponent;
  public chartOptions?: Partial<LineChartOptions>;

  chartData?: any = null;
  maxDateValue = new Date();
  occupancyDate: Date = new Date();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLocation?.currentValue) {
      this.expandPanel();
    }
    if (changes.occupancy && changes.occupancy.currentValue) {
      const occupancyData: Occupancy = changes.occupancy.currentValue;
      if (occupancyData?.occupancyStats?.length > 0) {
        const stats: number[] = [];
        const labels: string[] = [];
        const lastStat =
          occupancyData.occupancyStats[occupancyData.occupancyStats.length - 1];
        const liveTime = new Date(
          lastStat.year,
          lastStat.month - 1,
          lastStat.day,
          lastStat.hour
        );
        for (let h = 0; h < 24; h++) {
          if (occupancyData.occupancyStats[h]) {
            labels.push(
              moment(
                new Date(
                  occupancyData.occupancyStats[h].year,
                  occupancyData.occupancyStats[h].month - 1,
                  occupancyData.occupancyStats[h].day,
                  occupancyData.occupancyStats[h].hour
                )
              ).toLocaleString()
            );
            stats.push(
              (occupancyData.occupancyStats[h].averageOccupancy /
                occupancyData.maxOccupancyHistoric) *
                100
            );
          } else {
            labels.push(
              moment(
                new Date(
                  occupancyData.occupancyStats[0].year,
                  occupancyData.occupancyStats[0].month - 1,
                  occupancyData.occupancyStats[0].day,
                  h
                )
              ).toLocaleString()
            );
            stats.push(-1);
          }
        }
        this.chartData = {
          stats,
          labels,
        };
        this.updateChart(this.chartData, liveTime);
      }
    }
  }

  get isLive(): boolean {
    return moment(this.date).isSame(new Date(), 'date');
  }

  updateChart(data: any, liveTime: Date): void {
    if (this.chartData) {
      const chartOptions2 = _.cloneDeep(chartOptionsConfig);
      chartOptions2.series[0].data = this.chartData.stats;
      chartOptions2.labels = this.chartData.labels;
      chartOptions2.chart.redrawOnParentResize = true;
      chartOptions2.chart.height = 120;
      chartOptions2.chart.offsetY = -10;
      chartOptions2.chart.type = 'area';
      chartOptions2.chart.background = 'transparent';
      if (!this.isLive) {
        chartOptions2.annotations = undefined;
      } else if (chartOptions2.annotations?.xaxis) {
        chartOptions2.annotations.xaxis[0].x = liveTime.getTime();
      }
      this.chartOptions = chartOptions2;
      this.chart?.updateOptions(chartOptions2, true);
    }
  }

  onAnalyticsCalendarSelect(newDate: any): void {
    this.dateChanged.emit(newDate);
  }

  expandPanel(): void {
    this.toggleExpanded.emit(true);
  }
  toggleSize(): void {
    this.toggleExpanded.emit();
  }
}
