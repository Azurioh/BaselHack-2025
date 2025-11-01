/**
 * @const UserRoles
 * @description Const object for the user roles (compatible with erasableSyntaxOnly)
 */
export const UserRoles = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

/**
 * @type UserRoles
 * @description Type for user roles
 */
export type UserRoles = (typeof UserRoles)[keyof typeof UserRoles];
