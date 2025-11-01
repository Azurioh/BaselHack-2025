/**
 * @type AccessTokenPayload
 *
 * @description The payload for the access token.
 */
export type AccessTokenPayload = {
  id: string;
  name: string;
  email: string;
  role: string;
};

/**
 * @type RefreshTokenPayload
 *
 * @description The payload for the refresh token.
 */
export type RefreshTokenPayload = {
  id: string;
};

/**
 * @type ResetPasswordTokenPayload
 *
 * @description The payload for the reset password token.
 */
export type ResetPasswordTokenPayload = {
  id: string;
};
