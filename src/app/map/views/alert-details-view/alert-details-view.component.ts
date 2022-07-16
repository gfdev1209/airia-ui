import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Message } from 'primeng/api';
import { Alert, User } from '../../models';
import { AlertSeverity } from '@map/enums';
import { environment } from 'src/environments/environment';

import * as moment from 'moment-timezone';
import AccessLevels from '@core/utils/access-levels';

@Component({
    selector: 'app-alert-details-view',
    templateUrl: './alert-details-view.component.html',
    styleUrls: ['./alert-details-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDetailsViewComponent implements OnInit, OnChanges {
    @Input() alert?: Alert | null;
    @Input() self?: User | null;
    @Input() loading: boolean | null = false;
    @Input() isPlaybackLive: boolean | null = false;

    @Output() closeAlert = new EventEmitter();
    @Output() acknowledgeAlert = new EventEmitter<Alert>();
    @Output() pinalert = new EventEmitter<Alert>();
    @Output() viewAlertPlayback = new EventEmitter<Alert>();
    isMinimized =false;
    AlertSeverityEnum = AlertSeverity;
    reloadGraph=false;
    isMaximized= false;
    messages: Message[] = [
        {
            severity: 'custom',
            detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum auctor mollis.',
        },
    ];
    acknowledgedAt?: Date;
    pinnedAlerts:number[]=[];
    constructor() {}

    ngOnInit(): void {
        this.isMinimized = false;
        this.pinnedAlerts = JSON.parse(localStorage.getItem('pinnedAlerts') || '[]');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.alert && !changes.alert.firstChange) {
            if (changes.alert.currentValue?.acknowledgedAt) {
                this.acknowledgedAt = moment(changes.alert.currentValue?.acknowledgedAt).tz(environment.timeZone).toDate();
            }
        }
    }

    canAcknowledgeAlert(): boolean {
        if (this.self?.role) {
            return AccessLevels.roleHasAccessLevel(this.self.role.name, AccessLevels.CanAcknowledgeAlert);
        }
        return false;
    }

    onAcknowledge(): void {
        if (this.alert) {
            this.acknowledgeAlert.emit(this.alert);
        }
    }

    onViewAlertPlayback(): void {
        if (this.alert) {
            this.viewAlertPlayback.emit(this.alert);
        }
    }

    onClose($event: any): void {
        this.closeAlert.emit();
    }

   
    minimizeDialog(){
        this.isMinimized = !this.isMinimized;

    }

  
    onMaximize(event:any){
       this.reloadGraph = !this.reloadGraph;
       this.isMinimized = false;
    }

    
    pinAlert(alert:Alert){
        if (this.alert) {
            this.pinalert.emit(this.alert);
        }
        if(this.pinnedAlerts.includes(alert?.id)){           
            this.pinnedAlerts.splice(this.pinnedAlerts.indexOf(alert.id), 1);
            localStorage.setItem("pinnedAlerts", JSON.stringify(this.pinnedAlerts));
        }else{
            this.pinnedAlerts.push(alert.id);
            localStorage.setItem("pinnedAlerts", JSON.stringify(this.pinnedAlerts));
        }
      
    }
}
