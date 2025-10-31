import { UserController } from '@controllers/user.controllers';
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
    url: '/v1/users/me',
    handler: userController.getUserMe.bind(userController),
  });
  app.route({
    method: 'GET',
    url: '/v1/users/:id',
    handler: userController.getUserById.bind(userController),
  });
  app.route({
    method: 'GET',
    url: '/v1/users/:id/questions',
    handler: userController.listUserQuestions.bind(userController),
  });
  app.route({
    method: 'GET',
    url: '/v1/users/:id/answers',
    handler: userController.listUserAnswers.bind(userController),
  });
};
