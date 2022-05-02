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
    @Output() viewAlertPlayback = new EventEmitter<Alert>();

    AlertSeverityEnum = AlertSeverity;

    messages: Message[] = [
        {
            severity: 'custom',
            detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum auctor mollis.',
        },
    ];
    acknowledgedAt?: Date;

    constructor() {}

    ngOnInit(): void {}

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
}
