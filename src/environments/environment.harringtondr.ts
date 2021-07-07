export const environment = {
  production: true,
  apiUrl: 'https://api.harringtondr.airia20.com/api/',
  // MapBox
  mapboxAccessToken:
    'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
  // Azure B2C Configuration
  b2cClientId: '0d65b9b8-d654-481f-95d1-244fa3e6275b',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airiaharringtondr.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airiaharringtondr.b2clogin.com/harringtondr.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airiaharringtondr.b2clogin.com/harringtondr.airia20.com/B2C_1_airiaprofile',
  b2cScopes: ['https://harringtondr.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://api.harringtondr.airia20.com',
};
