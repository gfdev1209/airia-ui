export const environment = {
  production: true,
  apiUrl: 'https://nci-api.airia20.com/api/',
  // Client
  timeZone: 'America/New_York',
  timeZoneOffsetUTC: -(new Date().getTimezoneOffset() / 60),
  // The ID of the default Location to display
  defaultLocationId: 1,
  // The ID of the region that encompasses all regions
  entireRegionId: 11,
  // MapBox
  mapboxAccessToken:
    'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
  zoomLevel: 16,
  hidePOIs: false,
  hideStreetLabels: false,
  // Azure B2C Configuration
  b2cClientId: '8f71168b-00a6-4be2-b6cd-dc71a7c38a07',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airianci.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airianci.b2clogin.com/nci.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airianci.b2clogin.com/nci.airia20.com/B2C_1_airiaprofile',
  b2cAuthorityForgotPassword:
    'https://airianci.b2clogin.com/nci.airia20.com/b2c_1_airiapwreset',
  b2cScopes: ['https://nci.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://nci-api.airia20.com',
};
