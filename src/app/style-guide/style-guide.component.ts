import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.component.html',
  styleUrls: ['./style-guide.component.scss'],
})
export class StyleGuideComponent implements OnInit {
  checked = true;
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  basicData: any;
  basicOptions = {
    legend: {
      labels: {
        fontFamily: '"Roboto", "Helvetica Neue", sans-serif',
        fontColor: '#ffffff',
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
            color: '#43384b',
          },
          ticks: {
            fontFamily: '"Roboto", "Helvetica Neue", sans-serif',
            fontColor: '#766881',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: '#43384b',
          },
          ticks: {
            fontFamily: '"Roboto", "Helvetica Neue", sans-serif',
            fontColor: '#766881',
          },
        },
      ],
    },
  };
  stackedData: any;

  stackedOptions: any;

  constructor() {}

  ngOnInit(): void {
    this.basicData = {
      labels: ['4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM'],
      datasets: [
        {
          label: 'Capacity Levels',
          data: [90, 75, 160, 295, 280, 290, 295],
          fill: false,
          borderColor: '#9f64d1',
        },
      ],
    };

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
        labels: {
          fontFamily: '"Roboto", "Helvetica Neue", sans-serif',
          fontColor: '#ffffff',
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
            },
          },
        ],
      },
    };
  }
}
