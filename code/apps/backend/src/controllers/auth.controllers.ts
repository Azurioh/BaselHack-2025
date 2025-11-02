import { Errors } from '@baselhack/shared/enums/errors';
import { HttpStatusCode } from '@baselhack/shared/enums/http-status';
import type {
  LinkDiscordAccountBody,
  RefreshTokenBody,
  SignInBody,
  SignUpBody,
} from '@baselhack/shared/types/auth.types';
import type { AuthService } from '@services/auth.services';
import { isEmailValid, isPasswordValid } from '@utils/common';
import { hashPassword } from '@utils/password';
import { generateAccessToken, generateAccessTokenForDiscord, generateRefreshToken } from '@utils/token';
import type { FastifyReply, FastifyRequest } from 'fastify';

/**
 * @class AuthController
 *
 * @description Auth controller class
 */
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * @function signUp
   * @description Sign up a new user
   *
   * @param request The request object
   * @param reply The reply object
   */
  async signUp(request: FastifyRequest<{ Body: SignUpBody }>, reply: FastifyReply) {
    if (!isEmailValid(request.body.email) || !isPasswordValid(request.body.password)) {
      return reply.error('Invalid email or password', HttpStatusCode.badRequest, Errors.INVALID_CREDENTIALS);
    }

    const user = await this.authService.findUserByEmail(request.body.email);
    if (user) {
      return reply.error('User already exists', HttpStatusCode.conflict, Errors.USER_ALREADY_EXISTS);
    }

    await this.authService.signUp({
      ...request.body,
      password: await hashPassword(request.body.password),
    });

    reply.success('User created successfully', HttpStatusCode.created);
  }

  /**
   * @function signIn
   * @description Sign in a user
   *
   * @param request The request object
   * @param reply The reply object
   */
  async signIn(request: FastifyRequest<{ Body: SignInBody }>, reply: FastifyReply) {
    const user = await this.authService.signIn(request.body.email, request.body.password);

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      name: user.name || '',
      email: user.email,
      role: user.role || '',
    });
    const refreshToken = generateRefreshToken({ id: user._id.toString() }, request.body.rememberMe);

    reply.success({ accessToken, refreshToken });
  }

  /**
   * @function refreshToken
   * @description Refresh token
   *
   * @param request The request object
   * @param reply The reply object
   */
  async refreshToken(request: FastifyRequest<{ Body: RefreshTokenBody }>, reply: FastifyReply) {
    if (!request.user) {
      return reply.error('User not found', HttpStatusCode.notFound, Errors.RESOURCE_NOT_FOUND);
    }

    const token = await this.authService.refreshToken(request.body.refreshToken, request.user.id);

    reply.success({ token });
  }

  /**
   * @function linkDiscordAccount
   * @description Link a Discord account to a user
   *
   * @param request The request object
   * @param reply The reply object
   */
  async linkDiscordAccount(request: FastifyRequest<{ Body: LinkDiscordAccountBody }>, reply: FastifyReply) {
    if (!request.user) {
      return reply.error('User not found', HttpStatusCode.notFound, Errors.RESOURCE_NOT_FOUND);
    }

    if (!request.body.discordId || request.body.discordId.trim().length === 0) {
      return reply.error('Discord ID is required', HttpStatusCode.badRequest, Errors.INVALID_CREDENTIALS);
    }

    await this.authService.linkDiscordAccount(request.user.id, request.body.discordId);

    const token = generateAccessTokenForDiscord({
      id: request.user.id,
      name: request.user.name,
      email: request.user.email,
      role: request.user.role,
    });

    reply.success({ token }, HttpStatusCode.ok);
  }

  /**
   * @function unlinkDiscordAccount
   * @description Unlink a Discord account from a user
   *
   * @param request The request object
   * @param reply The reply object
   */
  async unlinkDiscordAccount(request: FastifyRequest, reply: FastifyReply) {
    if (!request.user) {
      return reply.error('User not found', HttpStatusCode.notFound, Errors.RESOURCE_NOT_FOUND);
    }

    await this.authService.unlinkDiscordAccount(request.user.id);

    reply.success('Discord account unlinked successfully', HttpStatusCode.ok);
  }

  async randomRegister(_request: FastifyRequest, reply: FastifyReply) {
    const userData = {
      email: `user${Math.random().toString(36).substring(2, 15)}@example.com`,
      password: 'password',
      name: `User ${Math.random().toString(36).substring(2, 15)}`,
      category: 'category',
      secret: 'secret',
    };

    await this.authService.signUp(userData);

    const loginUser = await this.authService.signIn(userData.email, userData.password);

    const accessToken = generateAccessToken({
      id: loginUser._id.toString(),
      name: loginUser.name || '',
      email: loginUser.email,
      role: loginUser.role || '',
    });
    const refreshToken = generateRefreshToken({ id: loginUser._id.toString() }, true);

    reply.success({ accessToken, refreshToken });
  }
}
