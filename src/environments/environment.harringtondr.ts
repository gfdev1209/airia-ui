export const environment = {
  production: true,
  apiUrl: 'https://harringtondr-api.dev.airia20.com/api/',
  // Client
  timeZone: 'America/New_York',
  timeZoneOffsetUTC: -(new Date().getTimezoneOffset() / 60),
  // The ID of the default Location to display
  defaultLocationId: 1,
  // The ID of the region that encompasses all regions
  entireRegionId: 21,
  // MapBox
  mapboxAccessToken:
    'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
  zoomLevel: 19,
  hidePOIs: false,
  hideStreetLabels: false,
  // Azure B2C Configuration
  b2cClientId: '07a24a28-4224-438b-a4a8-e386247a50f1',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airiaharringtondr.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airiaharringtondr.b2clogin.com/harringtondr.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airiaharringtondr.b2clogin.com/harringtondr.airia20.com/B2C_1_airiaprofile',
  b2cAuthorityForgotPassword:
    'https://airiaharringtondr.b2clogin.com/harringtondr.airia20.com/b2c_1_airiapwreset',
  b2cScopes: ['https://harringtondr.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://harringtondr-api.dev.airia20.com',
};
