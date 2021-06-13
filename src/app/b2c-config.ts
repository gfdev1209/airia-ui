import { environment } from 'src/environments/environment';

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: environment.b2cNameSignUpSignIn,
    editProfile: environment.b2cNameEditProfile,
  },
  authorities: {
    signUpSignIn: {
      authority: environment.b2cAuthoritySignUpSignIn,
    },
    editProfile: {
      authority: environment.b2cAuthorityEditProfile,
    },
  },
  authorityDomain: environment.b2cAuthorityDomain,
};

/**
 * Enter here the coordinates of your web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
export const apiConfig: { scopes: string[]; uri: string } = {
  scopes: environment.b2cScopes,
  uri: environment.b2cApiUrl,
};
