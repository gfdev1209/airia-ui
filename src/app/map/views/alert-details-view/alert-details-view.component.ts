import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Message } from 'primeng/api';
import { Alert, User } from '../../models';
import { AlertSeverity } from '@map/enums';
import { environment } from 'src/environments/environment';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-alert-details-view',
  templateUrl: './alert-details-view.component.html',
  styleUrls: ['./alert-details-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDetailsViewComponent implements OnInit, OnChanges {
  @Input() alert?: Alert | null;
  @Input() user?: User | null;
  @Input() loading: boolean | null = false;

  @Output() closeAlert = new EventEmitter();
  @Output() acknowledgeAlert = new EventEmitter<Alert>();

  AlertSeverityEnum = AlertSeverity;

  messages: Message[] = [
    {
      severity: 'custom',
      detail:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum auctor mollis.',
    },
  ];

  stackedData: any;

  stackedOptions: any;
  acknowledgedAt?: Date;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.alert && !changes.alert.firstChange) {
      if (changes.alert.currentValue?.acknowledgedAt) {
        this.acknowledgedAt = moment(changes.alert.currentValue?.acknowledgedAt)
          .tz(environment.timeZone)
          .toDate();
      }
    }
  }

  onAcknowledge(): void {
    if (this.alert) {
      this.acknowledgeAlert.emit(this.alert);
    }
  }

  onClose($event: any): void {
    this.closeAlert.emit();
  }
}
