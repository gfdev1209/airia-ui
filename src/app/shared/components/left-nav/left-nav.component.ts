import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { ConfirmationService } from 'primeng/api';

import * as UserSelectors from '@store/user/user.selectors';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
  providers: [ConfirmationService],
})
export class LeftNavComponent implements OnInit {
  self$ = this.store.select(UserSelectors.selectSelf);

  constructor(
    private authService: MsalService,
    private confirmationService: ConfirmationService,
    private store: Store<RootState>
  ) {}

  ngOnInit(): void {}

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
