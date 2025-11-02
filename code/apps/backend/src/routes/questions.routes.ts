import { QuestionsController } from '@controllers/questions.controllers';
import { authMiddleware } from '@middlewares/auth-middleware';
import { QuestionsRepository } from '@repositories/questions.repository';
import { UserRepository } from '@repositories/user.repository';
import { QuestionsService } from '@services/questions.service';
import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  if (!app.mongo.db) {
    throw new Error('MongoDB database is not connected');
  }
  const questionsRepository = new QuestionsRepository(app.mongo.db);
  const userRepository = new UserRepository(app.mongo.db);
  const questionsService = new QuestionsService(questionsRepository, userRepository);
  const questionsController = new QuestionsController(questionsService);

  app.route({
    method: 'POST',
    url: '/v1',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => questionsController.createQuestion(request, reply),
    preHandler: [authMiddleware({ adminOnly: true })],
  });
  app.route({
    method: 'GET',
    url: '/v1',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => questionsController.listAllQuestions(request, reply),
    preHandler: [authMiddleware()],
  });
  app.route({
    method: 'GET',
    url: '/v1/:question_id',
    handler: questionsController.findQuestionById.bind(questionsController),
  });
  app.route({
    method: 'PUT',
    url: '/v1/:question_id',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => questionsController.updateQuestion(request, reply),
    preHandler: [authMiddleware({ adminOnly: true })],
  });
  app.route({
    method: 'DELETE',
    url: '/v1/:question_id',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => questionsController.deleteQuestion(request, reply),
    preHandler: [authMiddleware({ adminOnly: true })],
  });
  app.route({
    method: 'POST',
    url: '/v1/:question_id/answer',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => questionsController.createAnswer(request, reply),
    preHandler: [authMiddleware({ optional: true })],
  });
  app.route({
    method: 'GET',
    url: '/v1/:question_id/answer',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => questionsController.findAnswerByQuestionId(request, reply),
    // preHandler: [authMiddleware()],
  });
  app.route({
    method: 'GET',
    url: '/v1/:question_id/answers',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => questionsController.listAnswersByQuestionId(request, reply),
    preHandler: [authMiddleware()],
  });
  app.route({
    method: 'PUT',
    url: '/v1/:question_id/answer/:answer_id',
    handler: questionsController.updateAnswer.bind(questionsController),
  });
  app.route({
    method: 'DELETE',
    url: '/v1/:question_id/answer/:answer_id',
    handler: questionsController.deleteAnswer.bind(questionsController),
  });
  app.route({
    method: 'POST',
    url: '/v1/local',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => questionsController.createLocalQuestion(request, reply),
    preHandler: [authMiddleware()],
  });
  app.route({
    method: 'POST',
    url: '/v1/:question_id/concense',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => questionsController.generateConcense(request, reply),
    preHandler: [authMiddleware({ adminOnly: true })],
  });
};
