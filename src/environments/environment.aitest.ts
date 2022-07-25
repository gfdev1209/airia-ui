export const environment = {
  production: true,
  apiUrl: 'https://aitest-api.dev.airia20.com/api/',
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
  zoomLevel: 16,
  hidePOIs: false,
  hideStreetLabels: false,
  // Azure B2C Configuration
  b2cClientId: '7530e20d-5462-4ca8-9726-720fcf7ccaf0',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airiaaitest.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airiaaitest.b2clogin.com/aitest.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airiaaitest.b2clogin.com/aitest.airia20.com/B2C_1_airiaprofile',
  b2cAuthorityForgotPassword:
    'https://airiaaitest.b2clogin.com/aitest.airia20.com/b2c_1_airiapwreset',
  b2cScopes: ['https://aitest.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://aitest-api.dev.airia20.com',
  
};
