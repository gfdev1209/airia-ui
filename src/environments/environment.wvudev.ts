export const environment = {
  production: true,
  apiUrl: 'https://wvu-api.dev.airia20.com/api/',
  // Client
  timeZone: 'America/New_York',
  timeZoneOffsetUTC: -(new Date().getTimezoneOffset() / 60),
  // The ID of the default Location to display
  defaultLocationId: 1,
  // The ID of the region that encompasses all regions
  entireRegionId: 1,
  // MapBox
  mapboxAccessToken:
    'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
  zoomLevel: 16,
  hidePOIs: true,
  hideStreetLabels: true,
  // Azure B2C Configuration
  b2cClientId: '70778b4b-053f-434c-9d86-d91faced2b30',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airiawvudevelop.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airiawvudevelop.b2clogin.com/wvudev.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airiawvudevelop.b2clogin.com/wvudev.airia20.com/B2C_1_airiaprofile',
  b2cAuthorityForgotPassword:
    'https://airiawvudevelop.b2clogin.com/wvudev.airia20.com/b2c_1_airiapwreset',
  b2cScopes: ['https://wvudev.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://wvu-api.dev.airia20.com',
};
