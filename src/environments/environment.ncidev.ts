export const environment = {
  production: true,
  apiUrl: 'https://nci-api.dev.airia20.com/api/',
  // Client
  timeZone: 'America/New_York',
  timeZoneOffsetUTC: -5,
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
  b2cClientId: '1ee073b5-4b2a-4a6d-bee4-30776a0fbd21',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airiancidevelop.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airiancidevelop.b2clogin.com/ncidev.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airiancidevelop.b2clogin.com/ncidev.airia20.com/B2C_1_airiaprofile',
  b2cAuthorityForgotPassword:
    'https://airiancidevelop.b2clogin.com/ncidev.airia20.com/b2c_1_airiapwreset',
  b2cScopes: ['https://ncidev.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://nci-api.dev.airia20.com',
};
