export const environment = {
  production: true,
  apiUrl: 'https://school-api.demo.airia20.com/api/',
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
  b2cClientId: '21c0b8ef-5dda-4076-800e-65c2a10fc48b',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airiaschooldemo.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airiaschooldemo.b2clogin.com/schooldemo.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airiaschooldemo.b2clogin.com/schooldemo.airia20.com/B2C_1_airiaprofile',
  b2cScopes: ['https://schooldemo.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://school-api.demo.airia20.com',
};
