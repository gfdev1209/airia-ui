import {
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
import { ChartOptions } from '@shared/constants';
import { groupBy } from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-building-details-occupancy-view',
  templateUrl: './building-details-occupancy-view.component.html',
  styleUrls: ['./building-details-occupancy-view.component.scss'],
})
export class BuildingDetailsOccupancyViewComponent
  implements OnInit, OnChanges
{
  @Input() analytics?: BuildingAnalytics | null;
  @Input() occupancy?: Occupancy | null;
  @Input() loading?: boolean | null;
  @Input() maximized!: boolean;
  @Input() tabChange: any;

  @Output() occupancyDateChanged = new EventEmitter<Date>();
  @Output() historicDateRangeChanged = new EventEmitter<Date[]>();

  @ViewChild('chart', { static: false }) chart?: ChartComponent;
  public chartOptions?: Partial<ChartOptions>;

  chartData: any;

  series: any[] = [];

  dateRange = [
    // {
    //   name: 'This Month',
    //   range: [
    //     moment(new Date()).subtract(1, 'months').startOf('month').toDate(),
    //     new Date(),
    //   ],
    // },
    // {
    //   name: 'Last Month',
    //   range: [
    //     moment(new Date()).subtract(1, 'months').startOf('month').toDate(),
    //     moment(new Date()).subtract(1, 'months').endOf('month').toDate(),
    //   ],
    // },
    {
      name: 'Last Week',
      range: [
        moment
          .utc()
          .subtract(1, 'week')
          .startOf('week')
          .subtract(environment.timeZoneOffsetUTC, 'hour')
          .toDate(),
        moment
          .utc()
          .subtract(1, 'week')
          .endOf('week')
          .subtract(environment.timeZoneOffsetUTC, 'hour')
          .toDate(),
      ],
    },
    // {
    //   name: '2 Weeks Ago',
    //   range: [
    //     moment
    //       .utc()
    //       .subtract(2, 'week')
    //       .startOf('week')
    //       .subtract(environment.timeZoneOffsetUTC, 'hour')
    //       .toDate(),
    //     moment
    //       .utc()
    //       .subtract(2, 'week')
    //       .endOf('week')
    //       .subtract(environment.timeZoneOffsetUTC, 'hour')
    //       .toDate(),
    //   ],
    // },
    // {
    //   name: 'This Week',
    //   range: [
    //     moment
    //       .utc()
    //       .startOf('week')
    //       .subtract(environment.timeZoneOffsetUTC, 'hour')
    //       .toDate(),
    //     moment
    //       .utc()
    //       .endOf('week')
    //       .subtract(environment.timeZoneOffsetUTC, 'hour')
    //       .toDate(),
    //   ],
    // },
  ];
  historicDataRange: any;
  maxDateValue = new Date();
  occupancyDate: Date = new Date();

  maxOccupancy = 3000;
  occupancyLevels = [{ date: new Date(2021, 7, 1, 0), occupancy: 100 }];

  sampleData: any;
  sampleOptions: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.analytics && !changes.analytics.firstChange) {
      console.log(changes.analytics?.currentValue);
    }
    if (changes.occupancy && changes.occupancy.currentValue) {
      const occupancyData = this.mapOccupancyData(
        changes.occupancy.currentValue
      );
      // console.log(occupancyData);
      this.chartData = Object.values(occupancyData).reverse();
    }
    if (
      (changes.maximized && !changes.maximized?.firstChange) ||
      changes.tabChange
    ) {
      window.dispatchEvent(new Event('resize'));
    }
  }

  mapOccupancyData(occupancyDataResponse: Occupancy): { [id: string]: any } {
    let occupancyDataArray = occupancyDataResponse.occupancyStats as any;
    // Group data by the hour
    occupancyDataArray = Object.values(
      groupBy(occupancyDataArray, (i) => i.hour)
    );
    // Create empty dictionary to store data
    const occupancyData: { [id: string]: any } = {};
    // Loop through each set of hourly data
    for (const key in occupancyDataArray) {
      if (key) {
        const data = occupancyDataArray[key];
        // Group hourly data by date
        const dataByDay = groupBy(
          data,
          (i) => i.day
          // moment(new Date(i.year, i.month, i.day)).format('ddd')
        );
        // Convert to an array
        const dataArray: any = Object.values(dataByDay);
        occupancyData[key] = { name: key, data: dataArray };
        dataArray.sort(
          (a: any, b: any) =>
            new Date(b[0].year, b[0].month - 1, b[0].day, b[0].hour).valueOf() -
            new Date(a[0].year, a[0].month - 1, a[0].day, a[0].hour).valueOf()
        );
        // Go through each day
        for (const dayKey in dataArray) {
          if (dayKey) {
            const days = dataArray[dayKey];
            // Calculate the average occupancy for all days in this hour
            const average =
              days.reduce((total: any, next: any) => {
                const avg =
                  next.averageOccupancy > 0
                    ? (next.averageOccupancy /
                        occupancyDataResponse.maxOccupancyHistoric) *
                      100
                    : 0;
                return total + avg;
              }, 0) / days.length;
            // Update dictionary value
            dataArray[dayKey] = {
              x: moment().day(dayKey).format('ddd'),
              y: average,
              hour: key,
            };
          }
        }
      }
    }
    return occupancyData;
  }

  ngOnInit(): void {}

  updateChartData(): void {}

  onOccupancyCalendarSelect(newDate: Date): void {
    this.occupancyDate = newDate;
    this.occupancyDateChanged.emit(newDate);
  }
  onHistoricDateSelected(data: any): void {
    console.log('range changed', data);
    this.historicDateRangeChanged.emit(data.value);
  }
}
