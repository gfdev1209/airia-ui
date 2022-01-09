import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
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
  @Input() displayedMapDateTime?: string | null;
  @Input() playbackSliderValue?: number | null = 0;
  @Input() playbackSliderMax?: number | null = 10;
  @Input() playbackSpeed?: number | null = 1;
  @Input() isExpanded?: boolean | null;
  @Input() isPlaybackLive?: boolean | null;
  @Input() isPlaying?: boolean | null;
  @Input() isDevicesLoading?: boolean | null;

  @Output() topPanelHeightChanged = new EventEmitter<number>();
  @Output() alertSortTypeChanged = new EventEmitter<AlertSortType>();
  @Output() zoomIn = new EventEmitter();
  @Output() zoomOut = new EventEmitter();
  @Output() mapTimeChanged = new EventEmitter<Date>();
  @Output() togglePlayback = new EventEmitter();
  @Output() toggleLive = new EventEmitter();
  @Output() toggleExpanded = new EventEmitter<boolean>();
  @Output() playbackSliderChanged = new EventEmitter<number>();
  @Output() resetPlaybackSlider = new EventEmitter();
  @Output() playbackSpeedChanged = new EventEmitter<number>();

  @Output() toggleAccessPoints = new EventEmitter<boolean>();
  @Output() toggleDevices = new EventEmitter<boolean>();
  @Output() toggledStaticDevices = new EventEmitter<boolean>();

  @ViewChild('topPanel') topPanel!: ElementRef;
  @ViewChild('alertPanel') private alertPanel!: AlertPanelComponent;

  activeState: boolean[] = [false, false, false];

  currentDateTime = new Date();

  footTraffic = true;
  staticDevices = true;
  iotDevices = true;
  accessPoints = false;

  severeUrgency = true;
  highUrgency = true;
  medUrgency = true;
  lowUrgency = true;
  acknowledged = true;
  capacity = true;
  apStatus = true;
  networkHealth = true;

  alertSortOptions = [
    { name: 'Sort by Date', value: AlertSortType.Date },
    { name: 'Sort by Severity', value: AlertSortType.Severity },
    { name: 'Sort by Type', value: AlertSortType.Type },
  ];
  selectedAlertSortOption = AlertSortType.Date;

  playbackOptions = [
    { name: '0.1x', value: 10 },
    { name: '0.25x', value: 4 },
    { name: '0.5x', value: 2 },
    { name: '1x', value: 1 },
    { name: '1.5x', value: 0.75 },
    { name: '2x', value: 0.5 },
    { name: '5x', value: 0.25 },
    { name: '10x', value: 0.125 },
  ];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLocation?.currentValue) {
      if (window.screen.width > 400) {
        this.expandPanel();
      }
      setTimeout(() => this.getTopPanelHeight(), 600);
    }
    if (changes.isExpanded?.currentValue) {
      setTimeout(() => this.getTopPanelHeight(), 600);
    }
    if (changes.isPlaying?.currentValue) {
      if (changes.isPlaying.currentValue === true) {
        this.activeState[0] = true;
      }
    }
  }

  ngAfterViewInit(): void {
    this.playbackSpeedChanged.emit(1);
  }

  expandPanel(): void {
    this.toggleExpanded.emit(true);
  }
  toggleSize(): void {
    this.toggleExpanded.emit();
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
    this.toggleAccessPoints.emit(event.checked);
  }
  onToggleDevices(event: any): void {
    this.toggleDevices.emit(event.checked);
  }
  onToggleIOT(event: any): void {
    this.toggledStaticDevices.emit(event.checked);
  }
  onSortChange(event: any): void {
    this.alertSortTypeChanged.emit(event?.value);
  }
  onPlaybackSpeedChange(event: any): void {
    this.playbackSpeedChanged.emit(event?.value);
  }
  onToggleSevereUrgency(event: any): void {
    this.alertPanel.onToggleSevereUrgency(event);
  }
  onToggleHighUrgency(event: any): void {
    this.alertPanel.onToggleHighUrgency(event);
  }
  onToggleMediumUrgency(event: any): void {
    this.alertPanel.onToggleMediumUrgency(event);
  }
  onToggleLowUrgency(event: any): void {
    this.alertPanel.onToggleLowUrgency(event);
  }
  onToggleAcknowledged(event: any): void {
    this.alertPanel.onToggleAcknowledged(event);
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

  onToggleLive(): void {
    // this.resetPlaybackMeter();
    this.toggleLive.emit();
  }

  onTogglePlayback(): void {
    this.togglePlayback.emit();
  }
  onCalendarOpen(event: any): void {
    // this.currentDateTime = new Date(
    //   moment().tz(environment.timeZone).format('YYYY-MM-DD HH:mm')
    // );
    this.currentDateTime = new Date();
  }
  onPlaybackCalendarSelect(newDate: any): void {
    this.changeDate(newDate);
  }
  onPlaybackIntervalChange(
    amount: number,
    unit: moment.unitOfTime.DurationConstructor
  ): void {
    const newDate = moment(this.mapDateTime).add(amount, unit).toDate();
    this.changeDate(newDate);
  }
  onPlaybackSliderChange(evt: any): void {
    // if (evt?.value && evt?.event?.type === 'click') {
    this.playbackSliderChanged.emit(evt?.value);
    // }
  }
  changeDate(newDate: Date): void {
    // this.resetPlaybackMeter();
    this.mapTimeChanged.emit(newDate);
  }
  resetPlaybackMeter(): void {
    this.resetPlaybackSlider.emit();
  }
  isDateInFuture(
    amount: number,
    unit: moment.unitOfTime.DurationConstructor
  ): boolean {
    return moment(this.mapDateTime).add(amount, unit).toDate() >= new Date()
      ? true
      : false;
  }
}
