import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
  providers: [ConfirmationService],
})
export class LeftNavComponent implements OnInit {
  expanded = false;

  constructor(
    private authService: MsalService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  toggleSize(): void {
    this.expanded = !this.expanded;
  }

  logout(): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to log out of Airia?`,
      header: 'Log Out',
      acceptButtonStyleClass: 'p-mr-0',
      acceptIcon: 'fal fa-check',
      rejectIcon: 'fal fa-times',
      accept: () => {
        this.authService.logoutRedirect({ postLogoutRedirectUri: '/map' });
      },
    });
  }
}
