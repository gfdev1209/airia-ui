import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-building-details-occupancy-view',
  templateUrl: './building-details-occupancy-view.component.html',
  styleUrls: ['./building-details-occupancy-view.component.scss'],
})
export class BuildingDetailsOccupancyViewComponent implements OnInit {
  @Output() occupancyDateChanged = new EventEmitter<Date>();
  @Output() historicDateRangeChanged = new EventEmitter<Date[]>();

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

  maxOccupancy = 3000;
  occupancyLevels = [{ date: new Date(2021, 7, 1, 0), occupancy: 1000 }];

  sampleData: any;
  sampleOptions: any;

  constructor() {
    for (let i = 1; i < 24; i++) {
      this.occupancyLevels.push({
        date: new Date(2021, 7, i, 0),
        occupancy: 100 + i * 100,
      });
    }
  }

  ngOnInit(): void {
    const labels = [];
    const data = [];
    for (let i = 0; i < 31; i++) {
      labels.push(moment().startOf('month').add(i, 'day').toDate());
      data.push(Math.floor(Math.random() * 95));
    }
    this.sampleData = {
      labels,
      datasets: [
        {
          label: 'Occupancy %',
          data,
          fill: false,
          borderColor: '#9F64D1',
        },
      ],
    };
    this.sampleOptions = {
      legend: {
        display: false,
        position: 'bottom',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              maxTicksLimit: 5,
              suggestedMin: 4,
              suggestedMax: 8,
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            isoWeekday: true,
            time: {
              unit: 'day',
              minUnit: 'day',
              stepSize: 1,
              tooltipFormat: 'MMMM DD, YYYY',
            },
          },
        ],
      },
    };
  }

  onOccupancyCalendarSelect(newDate: Date): void {
    this.occupancyDate = newDate;
    this.occupancyDateChanged.emit(newDate);
  }
  onHistoricDateSelected(data: any): void {
    this.historicDateRangeChanged.emit(data.value);
  }
}
