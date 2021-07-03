export const environment = {
  production: false,
  apiUrl: 'https://api.dev.airia20.com/api/',
  // MapBox
  mapboxAccessToken:
    'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
  // Azure B2C Configuration
  b2cClientId: 'c5f385f7-8c81-4623-8c7c-a9bdb5929559',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airia20develop.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airia20develop.b2clogin.com/airia20develop.onmicrosoft.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airia20develop.b2clogin.com/airia20develop.onmicrosoft.com/B2C_1_airiaprofile',
  b2cScopes: ['https://airia20develop.onmicrosoft.com/api/demo.read'],
  b2cApiUrl: 'https://api.dev.airia20.com',
};