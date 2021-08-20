export const environment = {
  production: true,
  apiUrl: 'https://lakewaydev-api.dev.airia20.com/api/',
  // MapBox
  mapboxAccessToken:
    'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
  // Azure B2C Configuration
  b2cClientId: '07a24a28-4224-438b-a4a8-e386247a50f1',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airialakewaydevelop.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airialakewaydevelop.b2clogin.com/harringtondr.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airialakewaydevelop.b2clogin.com/harringtondr.airia20.com/B2C_1_airiaprofile',
  b2cScopes: ['https://lakewaydev.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://lakewaydev-api.dev.airia20.com',
};
