import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-preview-view',
  templateUrl: './alert-preview-view.component.html',
  styleUrls: ['./alert-preview-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPreviewViewComponent {
  @Input() alert?: Alert;
  @Output() alertSelected = new EventEmitter<Alert>();

  constructor() {}

  onClick(): void {
    this.alertSelected.emit(this.alert);
  }
}
