import type { JSONSchemaType } from 'ajv';

/**
 * @type AccessTokenPayload
 *
 * @description The payload for the access token.
 */
export type AccessTokenPayload = {
  id: string;
  name: string;
  email: string;
};

/**
 * @constant accessTokenSchema
 *
 * @description JSON Schema for the access token payload.
 */
export const accessTokenSchema: JSONSchemaType<AccessTokenPayload> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['id', 'name', 'email'],
  additionalProperties: false,
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
 * @constant refreshTokenSchema
 *
 * @description JSON Schema for the refresh token payload.
 */
export const refreshTokenSchema: JSONSchemaType<RefreshTokenPayload> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: false,
};

/**
 * @type ResetPasswordTokenPayload
 *
 * @description The payload for the reset password token.
 */
export type ResetPasswordTokenPayload = {
  id: string;
};

/**
 * @constant resetPasswordTokenSchema
 *
 * @description JSON Schema for the reset password token payload.
 */
export const resetPasswordTokenSchema: JSONSchemaType<ResetPasswordTokenPayload> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: false,
};
