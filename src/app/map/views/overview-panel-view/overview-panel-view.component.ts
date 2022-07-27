import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChange,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { AlertPanelComponent } from '../../components/alert-panel/alert-panel.component';
import { AlertSortType } from '../../enums';
import { Location, User } from '../../models';

import * as moment from 'moment';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as DeviceSelectors from '@store/device/device.selectors';
import { RootState } from 'src/app/store';
import AccessLevels from '@core/utils/access-levels';
import { environment } from 'src/environments/environment';

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
    @Input() playbackSliderMax?: number | null = 30;
    @Input() playbackSpeed?: number | null = 1;
    @Input() isExpanded?: boolean | null;
    @Input() isPlaybackLive?: boolean | null;
    @Input() isPlaying?: boolean | null;
    @Input() isDevicesLoading?: boolean | null;
    @Input() alertSliderValue?: number | null = 0;
    @Input() self?: User | null;

    @Output() topPanelHeightChanged = new EventEmitter<number>();
    @Output() alertSortTypeChanged = new EventEmitter<AlertSortType>();
    @Output() alertSortDirectionChanged = new EventEmitter<number>();
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
    @Output() toggledClusters = new EventEmitter<boolean>();
    @Output() toggleSSID = new EventEmitter<boolean>();

    @Output() alertSliderChanged = new EventEmitter<number>();

    @ViewChild('topPanel') topPanel!: ElementRef;
    @ViewChild('alertPanel') private alertPanel!: AlertPanelComponent;

    activeState: boolean[] = [false, false, false];

    currentDateTime = new Date();
    maxDateTime = new Date();
   
    footTraffic = true;
    staticDevices = true;
    iotDevices = false;
    accessPoints = false;
    clusters = true;
    ssidDevices = false;
    SSIDList :any[]=[];

    severeUrgency = true;
    highUrgency = true;
    medUrgency = true;
    lowUrgency = true;
    acknowledged = true;
    capacity = true;
    apStatus = true;
    networkHealth = true;
    knobColor = '#ee4057';
    knobAlertValue = 0;
    
    alertSortOptions = [
        { name: 'Sort by Date', value: AlertSortType.Date },
        { name: 'Sort by Severity', value: AlertSortType.Severity },
        { name: 'Sort by Noise', value: AlertSortType.Noise },
        { name: 'Sort by Type', value: AlertSortType.Type },
    ];
    selectedAlertSortOption = AlertSortType.Date;
    sortDirection = -1;

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

    knobPreviousValue = -1
    devicesList$: Observable<any>;
    selectedSSID:any[]=[];
    disableAlertsKnob = true;

    private _deviceListSubscription = new Subscription();
    constructor(private store:Store<RootState>) {   
        this.disableAlertsKnob = environment?.disableAlertsKnob; 

        this.devicesList$ =  this.store.select(DeviceSelectors.selectAll);
        this._deviceListSubscription = this.devicesList$.subscribe((data:any)=>{
        let list = [...new Set(data.map((item:any) =>item['ssid']))];

        if(list.length){
            this.SSIDList = [];
            // this.SSIDList.push({ssid:'Unknown'});
            list.map((data:any) => {
                if(data){
                    this.SSIDList.push({ssid:data});
                } else {
                    this.SSIDList.push({ssid:"UNKNOWN"});
                }
            });
            this.SSIDList.map(item=> this.selectedSSID.push(item.ssid));
        }
        });
    }


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
                setTimeout(() => this.getTopPanelHeight(), 10);
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
            const height = rect.height + 55;
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
    onToggleClusters(event: any): void {
        this.toggledClusters.emit(event.checked);
    }

    onToggleSSID(event: any): void {
            this.ssidDevices = event.checked;
            this.selectedSSID = [];
            if( this.iotDevices || this.staticDevices){
                this.SSIDList.map(item=> this.selectedSSID.push(item.ssid));
            }else{
                this.selectedSSID = [];
            }
            
    }
    onChangeSSIDFilter(event:any):void {
       
        this.toggleSSID.emit(event.value);
        if(!event.value.length){
          
            this.SSIDList.map(item=> this.selectedSSID.push(item.ssid));
        }
    }
    onSortChange(event: any): void {
        this.alertSortTypeChanged.emit(event?.value);
    }
    onSortDirectionChange(event: any): void {

        if (this.sortDirection > 0) {
            this.sortDirection = -1;
        } else {
            this.sortDirection = 1;
        }
        if(this.knobAlertValue > 0){
            this.alertSortDirectionChanged.emit(this.sortDirection);
        }
       
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
        // this.currentDateTime = new Date();
    }
    onPlaybackCalendarSelect(newDate: any): void {
        this.changeDate(newDate);
    }
    onPlaybackIntervalChange(amount: number, unit: moment.unitOfTime.DurationConstructor): void {
        const newDate = moment(this.mapDateTime).add(amount, unit).toDate();
        this.changeDate(newDate);
    }
    onPlaybackSliderChange(evt: any): void {
        // if (evt?.value && evt?.event?.type === 'click') {
        this.playbackSliderChanged.emit(evt?.value);
        // }
    }


    onAlertSliderChange(evt: any): void {

        if(this.alertSliderValue! <= 3){
            this.knobColor = '#faca00';
        }else if(this.alertSliderValue! > 3 && this.alertSliderValue! < 7){
            this.knobColor = '#fa7000';
        }
        else if(this.alertSliderValue! > 7 ){
            this.knobColor = '#ee4057';
        }       
       
        if(this.knobPreviousValue != evt){
            this.knobPreviousValue = evt
            this.alertSliderChanged.emit(evt* 10);
            this.knobAlertValue = evt;
        }
        
    }
    changeDate(newDate: Date): void {
        // this.resetPlaybackMeter();
        this.mapTimeChanged.emit(newDate);
    }
    resetPlaybackMeter(): void {
        this.resetPlaybackSlider.emit();
    }
    isDateInFuture(amount: number, unit: moment.unitOfTime.DurationConstructor): boolean {
        return moment(this.mapDateTime).add(amount, unit).toDate() >= new Date() ? true : false;
    }

    canChangeKnob(): boolean {
        if (this.self?.role) {
            
            return AccessLevels.roleHasAccessLevel(this.self.role.name, (AccessLevels.CanChangeKnob));
        }
        return false;
    }

    ngOnDestroy(){
        this._deviceListSubscription?.unsubscribe();
    }
}
