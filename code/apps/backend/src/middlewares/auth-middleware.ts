import { Errors } from '@baselhack/shared/enums/errors';
import { HttpStatusCode } from '@baselhack/shared/enums/http-status';
import { UserRoles } from '@baselhack/shared/enums/users-enums';
import type { User } from '@baselhack/shared/types/user.types';
import { environment } from '@config/environment';
import type { AccessTokenPayload } from '@entities/token';
import { MongoCollections } from '@enums/mongo-collections-enums';
import { ObjectId } from '@fastify/mongodb';
import ApiError from '@utils/api-error';
import type { Maybe } from '@utils/common';
import { verifyToken } from '@utils/token';
import type { FastifyReply, FastifyRequest } from 'fastify';

interface AuthMiddlewareParams {
  refreshToken?: boolean;
  adminOnly?: boolean;
}

/**
 * @function authMiddleware
 * @description Middleware to authenticate requests using JWT tokens
 *
 * @param options - Configuration options for the middleware
 * @returns Fastify preHandler hook function
 */
export const authMiddleware = (options?: AuthMiddlewareParams) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return reply.error('Authorization header is required', HttpStatusCode.unauthorized, Errors.UNAUTHORIZED);
      }

      if (!authHeader.startsWith('Bearer ')) {
        return reply.error(
          'Invalid authorization header format. Expected: Bearer <token>',
          HttpStatusCode.unauthorized,
          Errors.UNAUTHORIZED,
        );
      }

      const token = authHeader.replace('Bearer ', '');

      if (!token || token.length === 0) {
        return reply.error('Token is required', HttpStatusCode.unauthorized, Errors.UNAUTHORIZED);
      }

      let decoded: Maybe<AccessTokenPayload>;
      try {
        decoded = verifyToken<AccessTokenPayload>(token, environment.JWT_SECRET, options?.refreshToken);
      } catch (error) {
        if (error instanceof Error) {
          return reply.error(error.message, HttpStatusCode.unauthorized, Errors.UNAUTHORIZED);
        }
        return reply.error('Internal server error', HttpStatusCode.internalServerError, Errors.INTERNAL_SERVER_ERROR);
      }

      if (!decoded || (!decoded && !options?.refreshToken)) {
        return reply.error('Invalid token', HttpStatusCode.unauthorized, Errors.UNAUTHORIZED);
      }

      const user = await request.db.collection<User>(MongoCollections.USERS).findOne({ _id: new ObjectId(decoded.id) });
      if (!user) {
        return reply.error('User not found', HttpStatusCode.unauthorized, Errors.UNAUTHORIZED);
      }

      if (options?.adminOnly && user.role !== UserRoles.ADMIN) {
        return reply.error('Forbidden', HttpStatusCode.forbidden, Errors.FORBIDDEN);
      }

      request.user = decoded;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      console.error('Auth middleware error:', error);
      return reply.error('Authentication failed', HttpStatusCode.internalServerError, Errors.INTERNAL_SERVER_ERROR);
    }
  };
};
