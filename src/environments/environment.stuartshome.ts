export const environment = {
  production: true,
  apiUrl: 'https://api.stuartshome.airia20.com/api/',
  // Azure B2C Configuration
  b2cClientId: '0d65b9b8-d654-481f-95d1-244fa3e6275b',
  b2cNameSignUpSignIn: 'B2C_1_airiasignupin',
  b2cNameEditProfile: 'B2C_1_airiaprofile',
  b2cAuthorityDomain: 'airiastuartshome.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airiastuartshome.b2clogin.com/stuartshome.airia20.com/B2C_1_airiasignupin',
  b2cAuthorityEditProfile:
    'https://airiastuartshome.b2clogin.com/stuartshome.airia20.com/B2C_1_airiaprofile',
  b2cScopes: ['https://stuartshome.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://api.stuartshome.airia20.com',
};