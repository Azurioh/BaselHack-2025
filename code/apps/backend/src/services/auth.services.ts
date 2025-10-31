import { Errors } from '@baselhack/shared/enums/errors';
import { HttpStatusCode } from '@baselhack/shared/enums/http-status';
import { UserRoles } from '@baselhack/shared/enums/users-enums';
import type { SignUpBody } from '@baselhack/shared/types/auth.types';
import type { User } from '@baselhack/shared/types/user.types';
import { environment } from '@config/environment';
import type { RefreshTokenPayload, ResetPasswordTokenPayload } from '@entities/token';
import type { UserRepository } from '@repositories/user.repository';
import ApiError from '@utils/api-error';
import type { Maybe } from '@utils/common';
import { hashPassword, verifyPassword } from '@utils/password';
import { generateRefreshToken, verifyToken } from '@utils/token';
import type { WithId } from 'mongodb';

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @function signUp
   * @description Sign up a new user
   *
   * @param body The sign up body
   */
  async signUp(body: SignUpBody): Promise<void> {
    const { secret, ...userData } = body;

    const data: User = {
      ...userData,
      role: secret === environment.ADMIN_SECRET ? UserRoles.ADMIN : UserRoles.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = await this.userRepository.createUser(data);

    if (!user.insertedId || !user.acknowledged) {
      throw new ApiError(HttpStatusCode.internalServerError, Errors.MONGO_CREATION_FAILED, 'Failed to create user');
    }
  }

  /**
   * @function signIn
   * @description Sign in a user
   *
   * @param email The email
   * @param password The password
   */
  async signIn(email: string, password: string): Promise<WithId<User>> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user || !verifyPassword(password, user.password)) {
      throw new ApiError(HttpStatusCode.unauthorized, Errors.INVALID_CREDENTIALS, 'Invalid credentials');
    }

    return user;
  }

  /**
   * @function findUserByEmail
   * @description Find a user by email
   *
   * @param email The email
   */
  async findUserByEmail(email: string): Promise<Maybe<WithId<User>>> {
    return this.userRepository.findUserByEmail(email);
  }

  /**
   * @function refreshToken
   * @description Refresh a token
   *
   * @param refreshToken The refresh token
   * @param id The user id
   */
  async refreshToken(refreshToken: string, id: string): Promise<string> {
    const decoded = verifyToken<RefreshTokenPayload>(refreshToken, environment.JWT_REFRESH_SECRET);
    if (!decoded || decoded.id !== id) {
      throw new ApiError(HttpStatusCode.unauthorized, Errors.INVALID_CREDENTIALS, 'Invalid token');
    }

    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new ApiError(HttpStatusCode.unauthorized, Errors.RESOURCE_NOT_FOUND, 'User not found');
    }

    return generateRefreshToken({ id }, false);
  }

  /**
   * @function resetPassword
   * @description Reset a password
   *
   * @param token The token
   * @param password The password
   */
  async resetPassword(token: string, password: string): Promise<void> {
    const decoded = verifyToken<ResetPasswordTokenPayload>(token, environment.JWT_RESET_PASSWORD_SECRET);
    if (!decoded) {
      throw new ApiError(HttpStatusCode.unauthorized, Errors.INVALID_CREDENTIALS, 'Invalid token');
    }

    const user = await this.userRepository.findUserById(decoded.id);
    if (!user) {
      throw new ApiError(HttpStatusCode.unauthorized, Errors.RESOURCE_NOT_FOUND, 'User not found');
    }

    const { _id, ...userData } = user;

    await this.userRepository.updateUser(user._id.toString(), { ...userData, password: await hashPassword(password) });
  }
}
