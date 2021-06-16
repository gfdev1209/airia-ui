import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AlertSeverity } from '@map/enums';
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-preview-view',
  templateUrl: './alert-preview-view.component.html',
  styleUrls: ['./alert-preview-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPreviewViewComponent {
  @Input() alert?: Alert;
  @Input() isSelected = false;
  @Output() alertSelected = new EventEmitter<Alert>();

  AlertSeverityEnum = AlertSeverity;

  constructor() {}

  onClick(): void {
    this.alertSelected.emit(this.alert);
  }
}
