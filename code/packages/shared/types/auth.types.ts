/**
 * @type SignUpBody
 *
 * @description Sign up body type
 */
export type SignUpBody = {
  email: string;
  password: string;
  name: string;
};

/**
 * @type SignInBody
 *
 * @description Sign in body type
 */
export type SignInBody = {
  email: string;
  password: string;
  rememberMe: boolean;
};

/**
 * @type ForgotPasswordBody
 *
 * @description Forgot Password body type
 */
export type ForgotPasswordBody = {
  email: string;
};

/**
 * @type RefreshTokenBody
 *
 * @description Refresh Token body type
 */
export type RefreshTokenBody = {
  refreshToken: string;
};
