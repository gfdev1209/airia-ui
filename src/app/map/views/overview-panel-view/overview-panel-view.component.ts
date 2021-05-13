import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AlertPanelComponent } from '../../components/alert-panel/alert-panel.component';
import { AlertSortType } from '../../enums';
import { Client } from '../../models';

@Component({
  selector: 'app-overview-panel-view',
  templateUrl: './overview-panel-view.component.html',
  styleUrls: ['./overview-panel-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewPanelViewComponent implements OnInit, AfterViewInit {
  @Input() client!: Client;

  expanded = true;

  footTraffic = true;
  staticDevices = true;
  accessPoints = true;

  highUrgency = true;
  medUrgency = true;
  capacity = true;
  apStatus = true;
  networkHealth = true;

  alertSortOptions = [
    { name: 'Sort by Date', code: AlertSortType.Date },
    { name: 'Sort by Urgency', code: AlertSortType.Urgency },
    { name: 'Sort by Type', code: AlertSortType.Type },
  ];

  @ViewChild('topPanel') topPanel!: ElementRef;
  @ViewChild('alertPanel') private alertPanel!: AlertPanelComponent;

  @Output() topPanelHeightChanged = new EventEmitter<number>();
  @Output() alertSortTypeChanged = new EventEmitter<AlertSortType>();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.getTopPanelHeight(), 10);
  }

  toggleSize(): void {
    this.expanded = !this.expanded;
  }
  onAccordionToggle(e: any): void {
    setTimeout(() => this.getTopPanelHeight(), 10);
  }
  getTopPanelHeight(): void {
    if (this.topPanel) {
      const rect: any = this.topPanel.nativeElement.getBoundingClientRect();
      const height = rect.height + 32;
      this.topPanelHeightChanged.emit(height);
    }
  }
  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }
  onSortChange(event: any): void {
    this.alertSortTypeChanged.emit(event?.value?.code);
  }
  onToggleHighUrgency(event: any): void {
    this.alertPanel.onToggleHighUrgency(event);
  }
  onToggleMediumUrgency(event: any): void {
    this.alertPanel.onToggleMediumUrgency(event);
  }
  onToggleCapacity(event: any): void {
    this.alertPanel.onToggleShowCapacity(event);
  }
  onToggleNetworkHealth(event: any): void {
    this.alertPanel.onToggleNetworkHealth(event);
  }
  onToggleShowNetworkHealth(event: any): void {
    this.alertPanel.onToggleShowAPStatus(event);
  }
}
