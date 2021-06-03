/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_airiasignupin',
    editProfile: 'B2C_1_airiaprofile',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://airia20develop.b2clogin.com/airia20develop.onmicrosoft.com/B2C_1_airiasignupin',
    },
    editProfile: {
      authority:
        'https://airia20develop.b2clogin.com/airia20develop.onmicrosoft.com/B2C_1_airiaprofile',
    },
  },
  authorityDomain: 'airia20develop.b2clogin.com',
};

/**
 * Enter here the coordinates of your web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
export const apiConfig: { scopes: string[]; uri: string } = {
  scopes: ['https://airia20develop.onmicrosoft.com/api/demo.read'],
  uri: 'https://api.dev.airia20.com',
};
