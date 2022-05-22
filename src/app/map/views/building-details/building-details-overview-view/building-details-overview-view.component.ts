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

import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { OccupancyStat } from '@map/models/occupancy-stat.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-building-details-overview-view',
  templateUrl: './building-details-overview-view.component.html',
  styleUrls: ['./building-details-overview-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingDetailsOverviewViewComponent implements OnInit, OnChanges {
  @Input() analytics?: BuildingAnalytics | null;
  @Input() occupancy?: Occupancy | null;
  @Input() loading?: boolean | null;
  @Input() historicLoading?: boolean | null;
  @Input() maximized!: boolean;
  @Input() analytics24Hours?: BuildingAnalytics | null;
  @Input() historicData?: Occupancy | null;

  @Output() occupancyDateChanged = new EventEmitter<Date>();
  @Output() historicDateRangeChanged = new EventEmitter<Date[]>();

  private chartData = new BehaviorSubject<any>(null);
  chartData$ = this.chartData.asObservable();

  private historicOccupancyChartData = new BehaviorSubject<any>(null);
  historicOccupancyChartData$ = this.historicOccupancyChartData.asObservable();
  private historicDeviceChartData = new BehaviorSubject<any>(null);
  historicDeviceChartData$ = this.historicDeviceChartData.asObservable();

  @ViewChild('historicRangeCalendar')
  historicRangeCalendar: any;

  historicDataRange: any;
  maxDateValue = new Date();
  occupancyDate: Date = new Date();
  historicRange?: Date[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.maximized && !changes.maximized?.firstChange) {
      window.dispatchEvent(new Event('resize'));
    }
    if (changes.occupancy && changes.occupancy.currentValue) {
      this.parseOccupancyData(changes.occupancy.currentValue);
    }
    if (changes.historicData && changes.historicData.currentValue) {
      this.parseHistoricDataOccupancy(changes.historicData.currentValue);
      this.parseHistoricDataDevices(changes.historicData.currentValue);
    }
  }

  ngOnInit(): void {
    this.historicRange = [
      moment(new Date())
        .subtract(1, 'week')
        .startOf('week')
        .utc()
        .toDate(),
      moment(new Date())
        .subtract(1, 'week')
        .endOf('week')
        .utc()
        .toDate(),
    ];
    this.historicDateRangeChanged.emit(this.historicRange);
  }

  onOccupancyCalendarSelect(newDate: Date): void {
    this.occupancyDate = newDate;
    this.occupancyDateChanged.emit(newDate);
  }
  onHistoricDateSelected(data: any): void {
    this.historicDateRangeChanged.emit(data.value);
  }
  onHistoricRangeSelected(data: any): void {
    console.log(data);
    if (this.historicRange?.length === 2 && this.historicRange[1]) {
      this.historicRangeCalendar?.toggle();
      this.historicDateRangeChanged.emit(this.historicRange);
    }
  }

  parseOccupancyData(occupancyData: Occupancy): void {
    occupancyData.occupancyStats.forEach((occupancy: OccupancyStat) => {
      occupancy.x = occupancy.day.toString();
      occupancy.y =
        (occupancy.averageOccupancy / occupancyData.maxOccupancyHistoric) * 100;
    });
    // occupancyData = Object.values(groupBy(occupancyData, (i) => i.day));
    occupancyData.occupancyStats.reverse();

    const occupancyDictionary = Object.values(
      occupancyData.occupancyStats.reduce(
        (a: any, x: any) => ({
          ...a,
          [x.hour]: {
            x: x.hour.toString(),
            y: (x.averageOccupancy / occupancyData.maxOccupancyHistoric) * 100,
            hour: x.hour.toString(),
            day: x.day.toString(),
            year: x.year.toString(),
            month: x.month.toString(),
            deviceCount: x.deviceCount,
          },
        }),
        {}
      )
    );
    this.chartData.next([{ name: '', data: occupancyDictionary }]);
  }

  parseHistoricDataOccupancy(occupancyData: Occupancy): void {
    this.historicOccupancyChartData.next(
      this.parseHistoricData(occupancyData, 'Occupancy', true)
    );
  }
  parseHistoricDataDevices(occupancyData: Occupancy): void {
    this.historicDeviceChartData.next(
      this.parseHistoricData(occupancyData, 'Devices', false)
    );
  }

  parseHistoricData(
    occupancyData: Occupancy,
    tooltipTitle: string,
    parseOccupancy: boolean
  ): any {
    if (occupancyData?.occupancyStats?.length > 0) {
      const series: number[] = [];
      const labels: string[] = [];
      const lastStat =
        occupancyData.occupancyStats[occupancyData.occupancyStats.length - 1];
      const liveTime = new Date(
        lastStat.year,
        lastStat.month - 1,
        lastStat.day,
        lastStat.hour
      );
      const seriesDictionary = parseOccupancy
        ? occupancyData.occupancyStats.reduce(
            (a, x) => ({
              ...a,
              [moment(new Date(x.year, x.month - 1, x.day)).toLocaleString()]:
                (x.averageOccupancy / occupancyData.maxOccupancyHistoric) * 100,
            }),
            {}
          )
        : occupancyData.occupancyStats.reduce(
            (a, x) => ({
              ...a,
              [moment(new Date(x.year, x.month - 1, x.day)).toLocaleString()]:
                x.deviceCount,
            }),
            {}
          );
      // Sort the dictionary by date
      const keyValues = [];
      for (const key in seriesDictionary) {
        if (key) {
          keyValues.push([key, seriesDictionary[key]]);
        }
      }
      for (const entry of keyValues) {
        labels.push(entry[0] as string);
        series.push(entry[1] as number);
      }

      return {
        series,
        labels,
        liveTime,
        tooltipTitle,
        usePercentage: parseOccupancy,
      };
    }
  }
}
