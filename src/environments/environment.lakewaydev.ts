export const environment = {
  production: true,
  apiUrl: 'https://lakeway-api.dev.airia20.com/api/',
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
  hidePOIs: true,
  hideStreetLabels: true,
  // Azure B2C Configuration
  b2cClientId: 'e7ac2c20-0582-468b-8a1d-5baf01094657',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airialakewaydevelop.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airialakewaydevelop.b2clogin.com/lakewaydev.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airialakewaydevelop.b2clogin.com/lakewaydev.airia20.com/B2C_1_airiaprofile',
  b2cScopes: ['https://lakewaydev.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://lakeway-api.dev.airia20.com',
};
