// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.dev.airia20.com/api/',
  // Azure B2C Configuration
  b2cClientId: 'c5f385f7-8c81-4623-8c7c-a9bdb5929559',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airia20develop.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airia20develop.b2clogin.com/airia20develop.onmicrosoft.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airia20develop.b2clogin.com/airia20develop.onmicrosoft.com/B2C_1_airiaprofile',
  b2cScopes: ['https://airia20develop.onmicrosoft.com/api/demo.read'],
  b2cApiUrl: 'https://api.dev.airia20.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
