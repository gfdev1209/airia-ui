import {
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BuildingAnalytics, Occupancy } from '@map/models';

import { ChartComponent } from 'ng-apexcharts';

import * as moment from 'moment';
import { ChartOptions, chartOptionsConfig } from '@shared/constants';
import { BehaviorSubject, Subject } from 'rxjs';

export const series = {
  monthDataSeries1: {
    prices: [
      2107.85, 3128.0, 5122.9, 3165.5, 6340.7, 2423.7, 8423.5, 4514.3, 6481.85,
      8487.7, 2506.9, 5626.2, 8668.95, 8602.3, 4607.55, 2512.9, 3496.25,
      5600.65, 6881.1, 9340.85, 0, 0, 0, 0,
    ],
    dates: [
      '13 Nov 2017',
      '14 Nov 2017',
      '15 Nov 2017',
      '16 Nov 2017',
      '17 Nov 2017',
      '20 Nov 2017',
      '21 Nov 2017',
      '22 Nov 2017',
      '23 Nov 2017',
      '24 Nov 2017',
      '27 Nov 2017',
      '28 Nov 2017',
      '29 Nov 2017',
      '30 Nov 2017',
      '01 Dec 2017',
      '04 Dec 2017',
      '05 Dec 2017',
      '06 Dec 2017',
      '07 Dec 2017',
      '08 Dec 2017',
      '09 Dec 2017',
      '10 Dec 2017',
      '11 Dec 2017',
    ],
  },
  monthDataSeries2: {
    prices: [
      8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3,
      8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9040.85, 8340.7, 8165.5,
      8122.9, 8107.85, 8128.0,
    ],
    dates: [
      '13 Nov 2017',
      '14 Nov 2017',
      '15 Nov 2017',
      '16 Nov 2017',
      '17 Nov 2017',
      '20 Nov 2017',
      '21 Nov 2017',
      '22 Nov 2017',
      '23 Nov 2017',
      '24 Nov 2017',
      '27 Nov 2017',
      '28 Nov 2017',
      '29 Nov 2017',
      '30 Nov 2017',
      '01 Dec 2017',
      '04 Dec 2017',
      '05 Dec 2017',
      '06 Dec 2017',
      '07 Dec 2017',
      '08 Dec 2017',
    ],
  },
  monthDataSeries3: {
    prices: [
      7114.25, 7126.6, 7116.95, 7203.7, 7233.75, 7451.0, 7381.15, 7348.95,
      7347.75, 7311.25, 7266.4, 7253.25, 7215.45, 7266.35, 7315.25, 7237.2,
      7191.4, 7238.95, 7222.6, 7217.9, 7359.3, 7371.55, 7371.15, 7469.2,
      7429.25, 7434.65, 7451.1, 7475.25, 7566.25, 7556.8, 7525.55, 7555.45,
      7560.9, 7490.7, 7527.6, 7551.9, 7514.85, 7577.95, 7592.3, 7621.95,
      7707.95, 7859.1, 7815.7, 7739.0, 7778.7, 7839.45, 7756.45, 7669.2,
      7580.45, 7452.85, 7617.25, 7701.6, 7606.8, 7620.05, 7513.85, 7498.45,
      7575.45, 7601.95, 7589.1, 7525.85, 7569.5, 7702.5, 7812.7, 7803.75,
      7816.3, 7851.15, 7912.2, 7972.8, 8145.0, 8161.1, 8121.05, 8071.25, 8088.2,
      8154.45, 8148.3, 8122.05, 8132.65, 8074.55, 7952.8, 7885.55, 7733.9,
      7897.15, 7973.15, 7888.5, 7842.8, 7838.4, 7909.85, 7892.75, 7897.75,
      7820.05, 7904.4, 7872.2, 7847.5, 7849.55, 7789.6, 7736.35, 7819.4,
      7875.35, 7871.8, 8076.5, 8114.8, 8193.55, 8217.1, 8235.05, 8215.3, 8216.4,
      8301.55, 8235.25, 8229.75, 8201.95, 8164.95, 8107.85, 8128.0, 8122.9,
      8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2,
    ],
    dates: [
      '02 Jun 2017',
      '05 Jun 2017',
      '06 Jun 2017',
      '07 Jun 2017',
      '08 Jun 2017',
      '09 Jun 2017',
      '12 Jun 2017',
      '13 Jun 2017',
      '14 Jun 2017',
      '15 Jun 2017',
      '16 Jun 2017',
      '19 Jun 2017',
      '20 Jun 2017',
      '21 Jun 2017',
      '22 Jun 2017',
      '23 Jun 2017',
      '27 Jun 2017',
      '28 Jun 2017',
      '29 Jun 2017',
      '30 Jun 2017',
      '03 Jul 2017',
      '04 Jul 2017',
      '05 Jul 2017',
      '06 Jul 2017',
      '07 Jul 2017',
      '10 Jul 2017',
      '11 Jul 2017',
      '12 Jul 2017',
      '13 Jul 2017',
      '14 Jul 2017',
      '17 Jul 2017',
      '18 Jul 2017',
      '19 Jul 2017',
      '20 Jul 2017',
      '21 Jul 2017',
      '24 Jul 2017',
      '25 Jul 2017',
      '26 Jul 2017',
      '27 Jul 2017',
      '28 Jul 2017',
      '31 Jul 2017',
      '01 Aug 2017',
      '02 Aug 2017',
      '03 Aug 2017',
      '04 Aug 2017',
      '07 Aug 2017',
      '08 Aug 2017',
      '09 Aug 2017',
      '10 Aug 2017',
      '11 Aug 2017',
      '14 Aug 2017',
      '16 Aug 2017',
      '17 Aug 2017',
      '18 Aug 2017',
      '21 Aug 2017',
      '22 Aug 2017',
      '23 Aug 2017',
      '24 Aug 2017',
      '28 Aug 2017',
      '29 Aug 2017',
      '30 Aug 2017',
      '31 Aug 2017',
      '01 Sep 2017',
      '04 Sep 2017',
      '05 Sep 2017',
      '06 Sep 2017',
      '07 Sep 2017',
      '08 Sep 2017',
      '11 Sep 2017',
      '12 Sep 2017',
      '13 Sep 2017',
      '14 Sep 2017',
      '15 Sep 2017',
      '18 Sep 2017',
      '19 Sep 2017',
      '20 Sep 2017',
      '21 Sep 2017',
      '22 Sep 2017',
      '25 Sep 2017',
      '26 Sep 2017',
      '27 Sep 2017',
      '28 Sep 2017',
      '29 Sep 2017',
      '03 Oct 2017',
      '04 Oct 2017',
      '05 Oct 2017',
      '06 Oct 2017',
      '09 Oct 2017',
      '10 Oct 2017',
      '11 Oct 2017',
      '12 Oct 2017',
      '13 Oct 2017',
      '16 Oct 2017',
      '17 Oct 2017',
      '18 Oct 2017',
      '19 Oct 2017',
      '23 Oct 2017',
      '24 Oct 2017',
      '25 Oct 2017',
      '26 Oct 2017',
      '27 Oct 2017',
      '30 Oct 2017',
      '31 Oct 2017',
      '01 Nov 2017',
      '02 Nov 2017',
      '03 Nov 2017',
      '06 Nov 2017',
      '07 Nov 2017',
      '08 Nov 2017',
      '09 Nov 2017',
      '10 Nov 2017',
      '13 Nov 2017',
      '14 Nov 2017',
      '15 Nov 2017',
      '16 Nov 2017',
      '17 Nov 2017',
      '20 Nov 2017',
      '21 Nov 2017',
      '22 Nov 2017',
      '23 Nov 2017',
      '24 Nov 2017',
      '27 Nov 2017',
      '28 Nov 2017',
    ],
  },
};

@Component({
  selector: 'app-building-details-overview-view',
  templateUrl: './building-details-overview-view.component.html',
  styleUrls: ['./building-details-overview-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingDetailsOverviewViewComponent implements OnInit, OnChanges {
  @Input() analytics?: BuildingAnalytics | null;
  @Input() occupancy?: Occupancy[] | null;
  @Input() loading?: boolean | null;
  @Input() maximized!: boolean;

  @Output() occupancyDateChanged = new EventEmitter<Date>();
  @Output() historicDateRangeChanged = new EventEmitter<Date[]>();

  chartData = new BehaviorSubject<any>(null);
  chartData$ = this.chartData.asObservable();

  // chartData: any;

  @ViewChild('chart', { static: false }) chart?: ChartComponent;
  public chartOptions?: Partial<ChartOptions>;

  dateRange = [
    {
      name: 'This Week',
      range: [
        moment().startOf('isoWeek').toDate(),
        moment().endOf('isoWeek').toDate(),
      ],
    },
    {
      name: 'Last Week',
      range: [
        moment().subtract(1, 'weeks').startOf('isoWeek').toDate(),
        moment().subtract(1, 'weeks').endOf('isoWeek').toDate(),
      ],
    },
    {
      name: 'This Month',
      range: [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate(),
      ],
    },
    {
      name: 'Last Month',
      range: [
        moment().subtract(1, 'month').startOf('month').toDate(),
        moment().subtract(1, 'month').endOf('month').toDate(),
      ],
    },
  ];
  historicDataRange: any;
  maxDateValue = new Date();
  occupancyDate: Date = new Date();

  sampleData: any;
  sampleOptions: any;

  series: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.analytics && !changes.analytics.firstChange) {
      console.log(changes.analytics?.currentValue);
    }
    if (changes.maximized && !changes.maximized?.firstChange) {
      window.dispatchEvent(new Event('resize'));
    }
    if (changes.occupancy && changes.occupancy.currentValue?.length > 0) {
      const occupancyData = changes.occupancy.currentValue;
      console.log(occupancyData);
      occupancyData.forEach((occupancy: any) => {
        occupancy.x = occupancy.day.toString();
        occupancy.y =
          (occupancy.averageOccupancy / occupancy.maxOccupancy) * 100;
      });
      // occupancyData = Object.values(groupBy(occupancyData, (i) => i.day));
      occupancyData.reverse();

      const occupancyDictionary = Object.values(
        occupancyData.reduce(
          (a: any, x: any) => ({
            ...a,
            [x.hour]: {
              x: x.hour.toString(),
              y: (x.averageOccupancy / x.maxOccupancy) * 100,
              hour: x.hour.toString(),
              day: x.day.toString(),
              year: x.year.toString(),
              month: x.month.toString(),
            },
          }),
          {}
        )
      );
      this.chartData.next([{ name: '', data: occupancyDictionary }]);
      // this.chartData = [{ name: '', data: occupancyDictionary }];
    }
  }

  ngOnInit(): void {
    const chartOptions2 = chartOptionsConfig;
    chartOptions2.series[0].data = series.monthDataSeries1.prices;
    chartOptions2.labels = series.monthDataSeries1.dates;
    chartOptions2.chart.redrawOnParentResize = true;
    this.chartOptions = chartOptions2;
    this.chart?.updateOptions(chartOptions2, true);
  }

  onOccupancyCalendarSelect(newDate: Date): void {
    this.occupancyDate = newDate;
    this.occupancyDateChanged.emit(newDate);
  }
  onHistoricDateSelected(data: any): void {
    this.historicDateRangeChanged.emit(data.value);
  }
}
