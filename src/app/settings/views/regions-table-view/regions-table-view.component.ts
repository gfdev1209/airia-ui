import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import AccessLevels from '@core/utils/access-levels';
import { Role } from '@map/enums/role.enum';
import { Region, User } from '@map/models';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
    selector: 'app-regions-table-view',
    templateUrl: './regions-table-view.component.html',
    styleUrls: ['./regions-table-view.component.scss'],
    providers: [ConfirmationService],
})
export class RegionsTableViewComponent implements OnInit {
    @Input() regions: Region[] | null = [];
    @Input() self?: User | null;
    @Input() loading?: boolean | null;
    @Output() regionSelected = new EventEmitter<Region>();
    @Output() deleteRegion = new EventEmitter<Region>();

    selectedRegion?: Region;
    role = Role;

    constructor(private confirmationService: ConfirmationService) {}

    ngOnInit(): void {}

    onRowSelect(event: any): void {
        this.onEdit(event.data);
    }
    canEdit(): boolean {
        if (this.self?.role) {
            return AccessLevels.roleHasAccessLevel(this.self.role.name, AccessLevels.CanEdit);
        }
        return false;
    }
    onEdit(region: Region): void {
        if (this.canEdit()) {
            this.regionSelected.emit(region);
        }
    }
    onDelete(region: Region): void {
        this.confirmationService.confirm({
            message: `Are you sure that you want to delete ${region.regionName}?`,
            header: 'Delete Confirmation',
            icon: 'fal fa-exclamation-square',
            acceptButtonStyleClass: 'p-mr-0',
            acceptIcon: 'fal fa-check',
            rejectIcon: 'fal fa-times',
            accept: () => {
                this.deleteRegion.emit(region);
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        console.log('rejected');
                        break;
                    case ConfirmEventType.CANCEL:
                        console.log('cancelled');
                        break;
                }
            },
        });
    }
}
