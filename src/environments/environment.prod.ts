export const environment = {
  production: true,
  apiUrl: 'https://api.stuartshome.airia20.com/api/',
  // MapBox
  mapboxAccessToken:
    'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
  // Azure B2C Configuration
  b2cClientId: '3696fd50-5745-45f7-b4d2-25fbaba1d90e',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'apitest.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://apitest.b2clogin.com/stuartshome.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://apitest.b2clogin.com/stuartshome.airia20.com/B2C_1_airiaprofile',
  b2cScopes: ['https://apitest.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://api.apitest.airia20.com',
};
