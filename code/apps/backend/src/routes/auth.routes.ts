import { AuthController } from '@controllers/auth.controllers';
import { UserRepository } from '@repositories/user.repository';
import { AuthService } from '@services/auth.services';
import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  if (!app.mongo.db) {
    throw new Error('MongoDB database is not connected');
  }
  const userRepository = new UserRepository(app.mongo.db);
  const authService = new AuthService(userRepository);
  const authController = new AuthController(authService);

  app.route({
    method: 'POST',
    url: '/v1/register',
    handler: authController.signUp.bind(authController),
  });
  app.route({
    method: 'POST',
    url: '/v1/login',
    handler: authController.signIn.bind(authController),
  });
  app.route({
    method: 'POST',
    url: '/v1/refresh-token',
    handler: authController.refreshToken.bind(authController),
  });
};
