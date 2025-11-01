import type { UserRoles } from '@baselhack/shared/enums/users-enums';

/**
 * @type User
 *
 * @description User type
 */
export type User = {
  name?: string;
  email: string;
  password: string;
  role?: UserRoles;
  category?: string;
  discordId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
