import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InMemApiService } from '@shared/services/in-mem-api.service';
import { FloorEffects } from '@store/floor/floor.effects';
import { LocationEffects } from '@store/location/location.effects';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { reducers } from './store';
import { AlertEffects } from './store/alert/alert.effects';
import { BuildingEffects } from './store/building/building.effects';

import { b2cPolicies, apiConfig } from './b2c-config';
import { AccessPointEffects } from '@store/access-point/access-point.effects';
import { DeviceEffects } from '@store/device/device.effects';
import { UserEffects } from '@store/user/user.effects';
import { DepartmentEffects } from '@store/department/department.effects';
import { RoleEffects } from '@store/role/role.effects';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string): void {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.b2cClientId,
      authority: b2cPolicies.authorities.signUpSignIn.authority,
      redirectUri: '/',
      postLogoutRedirectUri: '/',
      knownAuthorities: [b2cPolicies.authorityDomain],
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(apiConfig.uri, apiConfig.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...apiConfig.scopes],
    },
    loginFailedRoute: '/login',
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    MsalModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AlertEffects,
      BuildingEffects,
      LocationEffects,
      AccessPointEffects,
      DeviceEffects,
      FloorEffects,
      DepartmentEffects,
      UserEffects,
      RoleEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 20,
      logOnly: environment.production,
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxAccessToken,
    }),
  ],
  exports: [NgxMapboxGLModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
