import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-details-view',
  templateUrl: './alert-details-view.component.html',
  styleUrls: ['./alert-details-view.component.scss'],
})
export class AlertDetailsViewComponent implements OnInit {
  @Input() alert?: Alert | null;

  messages: Message[] = [
    {
      severity: 'custom',
      detail:
        'University Club has been low capacity for the past 8 weeks between the hours of 10 PM and 6 AM.',
    },
    {
      severity: 'custom',
      detail:
        'University Club is low capacity compared to the buildings within immediate vicinty',
    },
  ];

  stackedData: any;

  stackedOptions: any;

  constructor() {}

  ngOnInit(): void {
    this.stackedData = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      datasets: [
        {
          type: 'bar',
          label: 'Actual Occupancy',
          backgroundColor: '#D9C1ED',
          barPercentage: 0.75,
          data: [100, 600, 680, 660, 520, 670, 600, 680, 800, 620],
        },
        {
          type: 'bar',
          label: 'Max Occupancy',
          backgroundColor: '#9f64d1',
          barPercentage: 0.75,
          data: [850, 200, 300, 320, 400, 150, 320, 180, 200, 300],
        },
      ],
    };
    this.stackedOptions = {
      fontFamily: '"Roboto", "Helvetica Neue", sans-serif',
      legend: {
        position: 'bottom',
        labels: {
          fontFamily: '"Roboto", "Helvetica Neue", sans-serif',
          fontColor: '#ffffff',
          boxWidth: 20,
          boxHeight: 20,
        },
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: true,
              color: '#43384b',
            },
            ticks: {
              fontFamily: '"Roboto", "Helvetica Neue", sans-serif',
              fontColor: '#766881',
              maxTicksLimit: 3,
            },
          },
        ],
      },
    };
  }
}
