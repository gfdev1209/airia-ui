import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
  MsalBroadcastService,
} from '@azure/msal-angular';
import {
  InteractionStatus,
  EventMessage,
  EventType,
  AuthenticationResult,
  InteractionType,
  PopupRequest,
  RedirectRequest,
  AuthError,
} from '@azure/msal-browser';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { b2cPolicies } from './../../../b2c-config';

import * as UserActions from '@store/user/user.actions';
import * as UserSelectors from '@store/user/user.selectors';
import { User } from '@map/models';
import { environment } from 'src/environments/environment';

interface Payload extends AuthenticationResult {
  idTokenClaims: {
    tfp?: string;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  title = 'airia';
  loginDisplay = false;

  self$ = this.store
    .select(UserSelectors.selectSelf)
    .pipe(
      tap((user: any) => {
        if (user !== null) {
          this.router.navigate(['/map']);
        }
      })
    )
    .subscribe();

  private readonly destroying$ = new Subject<void>();
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
    private store: Store<RootState>
  ) {
    this.authService
      .handleRedirectObservable()
      .pipe(
        tap((result) => {
          return this.checkLoggedIn();
        })
      )
      .subscribe();
  }
  checkLoggedIn(): void {
    this.store.dispatch(UserActions.getSelf());
  }

  ngOnInit(): void {
    this.getLoginStatus();
  }

  async getLoginStatus(): Promise<void> {
    await this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType !== EventType.LOGIN_SUCCESS &&
            msg.eventType !== EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        takeUntil(this.destroying$)
      )
      .subscribe((result: EventMessage) => {
        this.loginDisplay = false;
        const error: AuthError = result.error as AuthError;
        if (error?.errorCode === 'no_tokens_found') {
          this.authService.logoutRedirect().subscribe();
        } else if (error?.errorMessage.indexOf('AADB2C90118') > -1) {
          const resetPasswordFlowRequest = {
            scopes: ['openid', 'profile'],
            authority: b2cPolicies.authorities.resetPassword.authority,
          };
          this.authService.loginRedirect(resetPasswordFlowRequest);
        } else if (error?.errorMessage.indexOf('AADB2C90091') > -1) {
          // Return to Login screen
          this.authService.loginRedirect();
        } else if (error) {
          console.log('error unaccounted for', result);
        }
      });

    await this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        takeUntil(this.destroying$)
      )
      .subscribe((result: EventMessage) => {
        const payload: Payload = result.payload as AuthenticationResult;

        /**
         * For the purpose of setting an active account for UI update, we want to consider only the auth response resulting
         * from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy policies may use "acr" instead of "tfp").
         * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
         */
        if (payload.idTokenClaims?.tfp === b2cPolicies.names.editProfile) {
          window.alert(
            'Profile has been updated successfully. \nPlease sign-in again.'
          );
          return this.logout();
        }

        return result;
      });
    await this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this.destroying$)
      )
      .subscribe((result) => {
        // this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  setLoginDisplay(): void {
    this.loginDisplay = this.authService.instance.getAllAccounts().length === 0;
  }

  checkAndSetActiveAccount(): void {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    const activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  login(userFlowRequest?: RedirectRequest | PopupRequest): void {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService
          .loginPopup({
            ...this.msalGuardConfig.authRequest,
            ...userFlowRequest,
          } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService
          .loginPopup(userFlowRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
          ...userFlowRequest,
        } as RedirectRequest);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  logout(): void {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  editProfile(): void {
    const editProfileFlowRequest = {
      scopes: ['openid'],
      authority: b2cPolicies.authorities.editProfile.authority,
    };

    this.login(editProfileFlowRequest);
  }

  ngOnDestroy(): void {
    this.destroying$.next(undefined);
    this.destroying$.complete();
    this.self$?.unsubscribe();
  }
}
