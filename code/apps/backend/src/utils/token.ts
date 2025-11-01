import { environment } from '@config/environment';
import type { AccessTokenPayload, RefreshTokenPayload, ResetPasswordTokenPayload } from '@entities/token';
import jwt from 'jsonwebtoken';
import type { Maybe } from './common';

/**
 * @description Generates an access token.
 *
 * @param payload The payload to sign.
 * @returns The signed access token.
 */
export const generateAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, environment.JWT_SECRET, { expiresIn: '3d' });
};

/**
 * @description Generates an access token for Discord.
 *
 * @param payload The payload to sign.
 * @returns The signed access token.
 */
export const generateAccessTokenForDiscord = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, environment.JWT_SECRET);
};

/**
 * @description Generates a refresh token.
 *
 * @param payload The payload to sign.
 * @param rememberMe Whether to remember the user.
 * @returns The signed refresh token.
 */
export const generateRefreshToken = (payload: RefreshTokenPayload, rememberMe: boolean) => {
  return jwt.sign(payload, environment.JWT_REFRESH_SECRET, { expiresIn: rememberMe ? '30d' : '1d' });
};

/**
 * @description Generates a reset password token.
 *
 * @param payload The payload to sign.
 * @returns The signed reset password token.
 */
export const generateResetPasswordToken = (payload: ResetPasswordTokenPayload) => {
  return jwt.sign(payload, environment.JWT_RESET_PASSWORD_SECRET, { expiresIn: '15m' });
};

/**
 * @description Verifies a JWT token and returns the decoded payload.
 *
 * @template T The expected type of the decoded token payload.
 * @param token The JWT token to verify.
 * @param secret The secret key used to verify the token.
 * @param refreshToken Optional flag indicating if it's a refresh token.
 * @returns
 */
export const verifyToken = <T>(token: string, secret: string, refreshToken?: boolean): Maybe<T> => {
  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    return decoded as T;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      if (refreshToken) {
        return null;
      }
      throw new Error('Token has expired');
    }
    if (err instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw new Error('Token verification failed');
  }
};
