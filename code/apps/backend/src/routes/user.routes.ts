import { UserController } from '@controllers/user.controllers';
import { authMiddleware } from '@middlewares/auth-middleware';
import { QuestionsRepository } from '@repositories/questions.repository';
import { UserRepository } from '@repositories/user.repository';
import { UserService } from '@services/user.service';
import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  if (!app.mongo.db) {
    throw new Error('MongoDB database is not connected');
  }
  const userRepository = new UserRepository(app.mongo.db);
  const questionsRepository = new QuestionsRepository(app.mongo.db);
  const userService = new UserService(userRepository, questionsRepository);
  const userController = new UserController(userService);

  app.route({
    method: 'GET',
    url: '/v1/me',
    handler: userController.getUserMe.bind(userController),
    preHandler: [authMiddleware()],
  });
  app.route({
    method: 'GET',
    url: '/v1/me/questions',
    handler: userController.listMeQuestions.bind(userController),
    preHandler: [authMiddleware()],
  });
  app.route({
    method: 'GET',
    url: '/v1/me/answers',
    handler: userController.listMeAnswers.bind(userController),
    preHandler: [authMiddleware()],
  });
  app.route({
    method: 'GET',
    url: '/v1/:id',
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => userController.getUserById(request, reply),
    preHandler: [authMiddleware({ adminOnly: true })],
  });
  app.route({
    method: 'GET',
    url: '/v1/:id/questions',
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => userController.listUserQuestions(request, reply),
    preHandler: [authMiddleware({ adminOnly: true })],
  });
  app.route({
    method: 'GET',
    url: '/v1/:id/answers',
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => userController.listUserAnswers(request, reply),
    preHandler: [authMiddleware({ adminOnly: true })],
  });
};
