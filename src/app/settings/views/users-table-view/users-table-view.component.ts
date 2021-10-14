import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import AccessLevels from '@core/utils/access-levels';
import { User } from '@map/models';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-users-table-view',
  templateUrl: './users-table-view.component.html',
  styleUrls: ['./users-table-view.component.scss'],
  providers: [ConfirmationService],
})
export class UsersTableViewComponent implements OnInit {
  @Input() users: User[] | null = [];
  @Input() self?: User | null;
  @Output() userSelected = new EventEmitter<User>();

  selectedUser?: User;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {}

  canEdit(): boolean {
    if (this.self?.role) {
      return AccessLevels.roleHasAccessLevel(
        this.self.role.name,
        AccessLevels.CanEdit
      );
    }
    return false;
  }

  onRowSelect(event: any): void {
    if (this.canEdit()) {
      this.userSelected.emit(event.data);
    }
  }

  onDelete(user: User): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${user.fullName}?`,
      header: 'Delete Confirmation',
      icon: 'fal fa-exclamation-square',
      acceptButtonStyleClass: 'p-mr-0',
      acceptIcon: 'fal fa-check',
      rejectIcon: 'fal fa-times',
      accept: () => {
        console.log('delete');
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
