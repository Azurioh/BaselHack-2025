import { Errors } from '@baselhack/shared/enums/errors';
import { HttpStatusCode } from '@baselhack/shared/enums/http-status';
import type { RefreshTokenBody, SignInBody, SignUpBody } from '@baselhack/shared/types/auth.types';
import type { AuthService } from '@services/auth.services';
import { isEmailValid, isPasswordValid } from '@utils/common';
import { hashPassword } from '@utils/password';
import { generateAccessToken, generateRefreshToken } from '@utils/token';
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
      name: user.name,
      email: user.email,
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
}
