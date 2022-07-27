export const environment = {
  production: true,
  apiUrl: 'https://college-api.demo.airia20.com/api/',
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
  b2cClientId: 'f777ab7e-fd60-41d1-91ed-c7d686ecf2f1',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airiacollegedemo.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airiacollegedemo.b2clogin.com/college.demo.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airiacollegedemo.b2clogin.com/college.demo.airia20.com/B2C_1_airiaprofile',
  b2cAuthorityForgotPassword:
    'https://airiacollegedemo.b2clogin.com/college.demo.airia20.com/b2c_1_airiapwreset',
  b2cScopes: ['https://college.demo.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://college-api.demo.airia20.com',
  disableAlertsKnob:false,
  enableAlertsKnobTime:new Date("2022-09-01").getTime()
};
