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

@Component({
  selector: 'app-building-details-occupancy-view',
  templateUrl: './building-details-occupancy-view.component.html',
  styleUrls: ['./building-details-occupancy-view.component.scss'],
})
export class BuildingDetailsOccupancyViewComponent
  implements OnInit, OnChanges
{
  @Input() analytics?: BuildingAnalytics | null;
  @Input() occupancy?: Occupancy[] | null;
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
    {
      name: 'Last Month',
      range: [
        moment(new Date()).subtract(1, 'months').startOf('month').toDate(),
        moment(new Date()).subtract(1, 'months').endOf('month').toDate(),
      ],
    },
    // {
    //   name: 'This Week',
    //   range: [
    //     moment().startOf('isoWeek').toDate(),
    //     moment().endOf('isoWeek').toDate(),
    //   ],
    // },
    // {
    //   name: 'Last Week',
    //   range: [
    //     moment().subtract(1, 'weeks').startOf('isoWeek').toDate(),
    //     moment().subtract(1, 'weeks').endOf('isoWeek').toDate(),
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
    if (changes.occupancy && changes.occupancy.currentValue?.length > 0) {
      const occupancyDataArray = changes.occupancy.currentValue;
      const occupancyData = this.mapOccupancyData(occupancyDataArray);
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

  mapOccupancyData(occupancyDataArray: any[]): { [id: string]: any } {
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
        // Group hourly data by day
        const dataByDay = groupBy(data, (i) =>
          moment(new Date(i.year, i.month, i.day)).format('ddd')
        );
        // Convert to an array
        const dataArray: any = Object.values(dataByDay);
        occupancyData[key] = { name: key, data: dataArray };
        // Go through each day
        for (const dayKey in dataArray) {
          if (dayKey) {
            const days = dataArray[dayKey];
            // Calculate the average occupancy for all days in this hour
            const average =
              days.reduce((total: any, next: any) => {
                const avg =
                  next.averageOccupancy > 0 && next.maxOccupancy > 0
                    ? (next.averageOccupancy / next.maxOccupancy) * 100
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
