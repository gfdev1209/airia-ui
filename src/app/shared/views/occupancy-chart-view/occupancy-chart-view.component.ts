import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { OccupancyAlertGraph } from '@map/models/occupancy-alert-graph.model';
import { occupancyChartOptionsConfig, OccupancyChartOptions } from '@shared/constants';
import * as ApexCharts from 'apexcharts';
import * as _ from 'lodash';
import { ChartComponent } from 'ng-apexcharts';
import { from } from 'rxjs';
import { max } from 'rxjs/operators';
@Component({
    selector: 'app-occupancy-chart-view',
    templateUrl: './occupancy-chart-view.component.html',
    styleUrls: ['./occupancy-chart-view.component.scss'],
})
export class OccupancyChartViewComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('chart', { static: false }) chart?: ChartComponent;
    public chartOptions?: Partial<OccupancyChartOptions>;

    @Input() occupancyAlertGraph?: OccupancyAlertGraph | null;

    @ViewChild('myChart') myChart!: ElementRef;

    constructor() {}

    ngAfterViewInit(): void {
        if (this.myChart) {
            const chart = new ApexCharts(this.myChart, this.chartOptions);
            chart.render().then(() => {
                window.setTimeout(() => {
                    chart.dataURI().then((uri) => {
                        console.log(uri);
                    });
                }, 5000);
            });
        }
    }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.occupancyAlertGraph?.currentValue) {
            console.log('update graph', changes.occupancyAlertGraph.currentValue);
            this.updateChart();
        }
    }

    updateChart(): void {
        if (this.occupancyAlertGraph) {
            const chartOptions2 = _.cloneDeep(occupancyChartOptionsConfig);
            chartOptions2.series[0].data = this.generateTimeSeries(
                this.occupancyAlertGraph.highOccupancyThreshold,
                this.occupancyAlertGraph.time
            );
            chartOptions2.series[1].data = this.generateTimeSeries(
                this.occupancyAlertGraph.lowOccupancyThreshold,
                this.occupancyAlertGraph.time
            );
            chartOptions2.series[2].data = this.generateTimeSeries(this.occupancyAlertGraph.occupancy, this.occupancyAlertGraph.time);
            chartOptions2.chart.redrawOnParentResize = true;
            chartOptions2.annotations.xaxis[0].x = this.occupancyAlertGraph.alertStartTime.getTime();
            chartOptions2.annotations.xaxis[0].x2 = this.occupancyAlertGraph.alertEndTime.getTime();

            const maxOccupancy =  Math.max( ...this.occupancyAlertGraph.occupancy )
            chartOptions2.yaxis.max = maxOccupancy + 5;

            this.chartOptions = chartOptions2;
            this.chart?.updateOptions(chartOptions2, true);
        }
    }
    generateTimeSeries(values: number[], time: Date[]): any[] {
        const series: any[] = [];
        time.forEach((timestamp, index) => {
            if (values[index] !== undefined) {
                series.push([timestamp.getTime(), values[index]]);
            }
        });
        return series;
    }
}
