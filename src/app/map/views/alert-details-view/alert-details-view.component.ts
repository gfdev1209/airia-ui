import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';

import { Message } from 'primeng/api';
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-details-view',
  templateUrl: './alert-details-view.component.html',
  styleUrls: ['./alert-details-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slidePanel', [
      state(
        'true',
        style({ transform: 'translateX(0)', opacity: 1, visibility: 'visible' })
      ),
      state(
        'false',
        style({
          transform: 'translateX(-50%)',
          opacity: 0,
          visibility: 'hidden',
        })
      ),
      transition('* => *', animate('350ms ease-out')),
    ]),
  ],
})
export class AlertDetailsViewComponent implements OnInit {
  @Input() alert?: Alert | null;

  @Output() closeAlert = new EventEmitter();

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
      labels: [
        '10 PM',
        '11 PM',
        '12 AM',
        '1 AM',
        '2 AM',
        '3 AM',
        '4 AM',
        '5 AM',
        '6 AM',
        '7 AM',
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Occupancy %',
          backgroundColor: '#9f64d1',
          barPercentage: 0.75,
          data: [40, 60, 68, 66, 52, 67, 60, 68, 80, 62],
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

  onClose($event: any): void {
    this.closeAlert.emit();
  }
}
