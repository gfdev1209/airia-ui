import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AlertPanelComponent } from '../../components/alert-panel/alert-panel.component';
import { AlertSortType } from '../../enums';
import { Location } from '../../models';

import * as moment from 'moment';

@Component({
  selector: 'app-overview-panel-view',
  templateUrl: './overview-panel-view.component.html',
  styleUrls: ['./overview-panel-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewPanelViewComponent implements AfterViewInit, OnChanges {
  @Input() selectedLocation!: Location | null;
  @Input() mapDateTime?: Date | null;

  @Output() topPanelHeightChanged = new EventEmitter<number>();
  @Output() alertSortTypeChanged = new EventEmitter<AlertSortType>();
  @Output() zoomIn = new EventEmitter();
  @Output() zoomOut = new EventEmitter();
  @Output() mapTimeChanged = new EventEmitter<Date>();
  @Output() toggledPlayback = new EventEmitter<boolean>();

  @Output() toggledAccessPoints = new EventEmitter<boolean>();
  @Output() toggledDevices = new EventEmitter<boolean>();

  @ViewChild('topPanel') topPanel!: ElementRef;
  @ViewChild('alertPanel') private alertPanel!: AlertPanelComponent;

  expanded = false;

  playbackDate: Date = new Date();
  isPlaybackLive = true;

  footTraffic = true;
  staticDevices = true;
  accessPoints = true;

  highUrgency = true;
  medUrgency = true;
  capacity = true;
  apStatus = true;
  networkHealth = true;

  alertSortOptions = [
    { name: 'Sort by Date', value: AlertSortType.Date },
    { name: 'Sort by Urgency', value: AlertSortType.Urgency },
    { name: 'Sort by Type', value: AlertSortType.Type },
  ];
  selectedAlertSortOption = AlertSortType.Date;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLocation?.currentValue) {
      this.expandPanel();
      setTimeout(() => this.getTopPanelHeight(), 600);
    }
  }

  ngAfterViewInit(): void {}

  expandPanel(): void {
    this.expanded = true;
  }
  toggleSize(): void {
    this.expanded = !this.expanded;
  }
  onZoomIn(): void {
    this.zoomIn.emit();
  }
  onZoomOut(): void {
    this.zoomOut.emit();
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
  onToggleAccessPoints(event: any): void {
    this.toggledAccessPoints.emit(event.checked);
  }
  onToggleDevices(event: any): void {
    this.toggledDevices.emit(event.checked);
  }
  onSortChange(event: any): void {
    this.alertSortTypeChanged.emit(event?.value);
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

  onTogglePlayback(): void {
    this.isPlaybackLive = !this.isPlaybackLive;
    // If we are live now, change the date to current time
    if (this.isPlaybackLive === true) {
      this.changeDate(new Date());
    }
    this.toggledPlayback.emit(this.isPlaybackLive);
  }
  onPlaybackCalendarSelect(newDate: any): void {
    this.changeDate(newDate);
    this.isPlaybackLive = false;
  }
  onPlaybackIntervalChange(
    amount: number,
    unit: moment.unitOfTime.DurationConstructor
  ): void {
    const newDate = moment(this.mapDateTime).add(amount, unit).toDate();
    this.changeDate(newDate);
    this.isPlaybackLive = false;
  }
  changeDate(newDate: Date): void {
    this.mapTimeChanged.emit(newDate);
  }
}
