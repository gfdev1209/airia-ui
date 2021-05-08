import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-panel-view',
  templateUrl: './alert-panel-view.component.html',
  styleUrls: ['./alert-panel-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPanelViewComponent {
  @Input() height?: number | null;
  @Input() alerts?: Alert[] | null;
  Math = Math;

  constructor() {}

  randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
