export const environment = {
  production: true,
  apiUrl: 'https://devtest-api.dev.airia20.com/api/',
  // Client
  timeZone: 'America/New_York',
  timeZoneOffsetUTC: -5,
  // MapBox
  mapboxAccessToken:
    'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
  zoomLevel: 16,
  hidePOIs: false,
  hideStreetLabels: false,
  // Azure B2C Configuration
  b2cClientId: '1323e915-5d93-4af9-a96d-27bef53afe8c',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airiadevtest.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airiadevtest.b2clogin.com/devtest.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airiadevtest.b2clogin.com/devtest.airia20.com/B2C_1_airiaprofile',
  b2cScopes: ['https://airiadevtest.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://devtest-api.dev.airia20.com',
};
