import { QuestionsController } from '@controllers/questions.controllers';
import { QuestionsRepository } from '@repositories/questions.repository';
import { QuestionsService } from '@services/questions.service';
import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  if (!app.mongo.db) {
    throw new Error('MongoDB database is not connected');
  }
  const questionsRepository = new QuestionsRepository(app.mongo.db);
  const questionsService = new QuestionsService(questionsRepository);
  const questionsController = new QuestionsController(questionsService);

  app.route({
    method: 'POST',
    url: '/v1/questions',
    handler: questionsController.createQuestion.bind(questionsController),
  });
  app.route({
    method: 'GET',
    url: '/v1/questions',
    handler: questionsController.listAllQuestions.bind(questionsController),
  });
  app.route({
    method: 'GET',
    url: '/v1/questions/:question_id',
    handler: questionsController.findQuestionById.bind(questionsController),
  });
  app.route({
    method: 'PUT',
    url: '/v1/questions/:question_id',
    handler: questionsController.updateQuestion.bind(questionsController),
  });
  app.route({
    method: 'DELETE',
    url: '/v1/questions/:question_id',
    handler: questionsController.deleteQuestion.bind(questionsController),
  });
  app.route({
    method: 'POST',
    url: '/v1/questions/:question_id/answer',
    handler: questionsController.createAnswer.bind(questionsController),
  });
  app.route({
    method: 'GET',
    url: '/v1/questions/:question_id/answer',
    handler: questionsController.findAnswerByQuestionId.bind(questionsController),
  });
  app.route({
    method: 'GET',
    url: '/v1/questions/:question_id/answers',
    handler: questionsController.listAnswersByQuestionId.bind(questionsController),
  });
  app.route({
    method: 'PUT',
    url: '/v1/questions/:question_id/answer/:answer_id',
    handler: questionsController.updateAnswer.bind(questionsController),
  });
  app.route({
    method: 'DELETE',
    url: '/v1/questions/:question_id/answer/:answer_id',
    handler: questionsController.deleteAnswer.bind(questionsController),
  });
};
