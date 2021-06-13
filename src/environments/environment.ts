// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '',
  // Azure B2C Configuration
  b2cClientId: '0d65b9b8-d654-481f-95d1-244fa3e6275b',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airiastuartshome.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airiastuartshome.b2clogin.com/stuartshome.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airiastuartshome.b2clogin.com/stuartshome.airia20.com/B2C_1_airiaprofile',
  b2cScopes: ['https://stuartshome.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://api.stuartshome.airia20.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
