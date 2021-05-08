import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-panel-view',
  templateUrl: './alert-panel-view.component.html',
  styleUrls: ['./alert-panel-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPanelViewComponent implements OnInit {
  @Input() height?: number | null;

  alerts: Alert[] = [
    {
      id: 1,
      message: 'High level alert. Immediate action.',
      createdAt: new Date(),
      alertSeverity: 1,
      alertType: 1,
    },
    {
      id: 1,
      message: 'High level alert. Immediate action.',
      createdAt: new Date(),
      alertSeverity: 1,
      alertType: 1,
    },
    {
      id: 1,
      message: 'High level alert. Immediate action.',
      createdAt: new Date(),
      alertSeverity: 1,
      alertType: 1,
    },
    {
      id: 1,
      message: 'High level alert. Immediate action.',
      createdAt: new Date(),
      alertSeverity: 1,
      alertType: 1,
    },
    {
      id: 1,
      message: 'High level alert. Immediate action.',
      createdAt: new Date(),
      alertSeverity: 1,
      alertType: 1,
    },
    {
      id: 1,
      message: 'High level alert. Immediate action.',
      createdAt: new Date(),
      alertSeverity: 1,
      alertType: 1,
    },
    {
      id: 1,
      message: 'High level alert. Immediate action.',
      createdAt: new Date(),
      alertSeverity: 1,
      alertType: 1,
    },
    {
      id: 1,
      message: 'High level alert. Immediate action.',
      createdAt: new Date(),
      alertSeverity: 1,
      alertType: 1,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
