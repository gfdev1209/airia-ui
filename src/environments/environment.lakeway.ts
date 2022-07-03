export const environment = {
  production: true,
  apiUrl: 'https://lakeway-api.airia20.com/b2c/',
  // Client
  timeZone: 'America/New_York',
  timeZoneOffsetUTC: -(new Date().getTimezoneOffset() / 60),
  // The ID of the default Location to display
  defaultLocationId: 1,
  // The ID of the region that encompasses all regions
  entireRegionId: 21,
  // MapBox
  mapboxAccessToken:
    'pk.eyJ1IjoibWlrZWFpcmlhIiwiYSI6ImNrbnF1cnNnaTBnaG8ydm15dXRuOGVodDgifQ.LbEjDzKyUje8uRE220hoqQ',
  zoomLevel: 16,
  hidePOIs: false,
  hideStreetLabels: false,
  // Azure B2C Configuration
  b2cClientId: 'c0813e87-e3d0-4df3-9f84-0bd301763e1f',
  b2cNameSignUpSignIn: 'B2C_1A_SIGNUP_SIGNIN',
  b2cNameEditProfile: 'B2C_1A_profile',
  b2cAuthorityForgotPassword: 'B2C_1A_PASSWORDRESET'
  b2cAuthorityDomain: 'airialakeway.b2clogin.com',
  b2cAuthoritySignUpSignIn:
    'https://airialakeway.b2clogin.com/lakeway.airia20.com/B2C_1A_SIGNUP_SIGNIN',
  b2cAuthorityEditProfile:
    'https://airialakeway.b2clogin.com/lakeway.airia20.com/B2C_1A_profileedit',
  b2cAuthorityForgotPassword:
    'https://airialakeway.b2clogin.com/lakeway.airia20.com/B2C_1A_PASSWORDRESET',
  b2cScopes: ['https://lakeway.airia20.com/api/demo.read'],
  b2cApiUrl: 'https://lakeway-api.airia20.com',
};
