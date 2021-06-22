import {
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AccessPointStatus } from '@map/enums';
import { AccessPoint } from '@map/models';

@Component({
  selector: 'app-access-point-overview-view',
  templateUrl: './access-point-overview-view.component.html',
  styleUrls: ['./access-point-overview-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessPointOverviewViewComponent implements OnInit {
  @Input() accessPoint?: AccessPoint | null;
  @Input() loading: boolean | null = false;

  @Output() closePanel = new EventEmitter();

  AccessPointStatusEnum = AccessPointStatus;

  constructor() {}

  ngOnInit(): void {}

  onClose(): void {
    this.closePanel.emit();
  }
}
