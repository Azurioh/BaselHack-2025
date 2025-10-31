import { HttpStatusCode } from '@baselhack/shared/enums/http-status';
import type { Question } from '@baselhack/shared/types/questions.types';
import type { QuestionsService } from '@services/questions.service';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Filter } from 'mongodb';

export class QuestionsController {
  private questionsService: QuestionsService;

  constructor(questionsService: QuestionsService) {
    this.questionsService = questionsService;
  }

  async createQuestion(request: FastifyRequest<{ Body: Question }>, reply: FastifyReply) {
    const question = await this.questionsService.createQuestion(request.body);

    reply.success(question, HttpStatusCode.created);
  }

  async listAllQuestions(request: FastifyRequest<{ Querystring: { filter?: Filter<Question> } }>, reply: FastifyReply) {
    const questions = await this.questionsService.listAllQuestions(request.query.filter);

    reply.success(questions, HttpStatusCode.ok);
  }

  async findQuestionById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const question = await this.questionsService.findQuestionById(request.params.id);

    reply.success(question, HttpStatusCode.ok);
  }

  async updateQuestion(request: FastifyRequest<{ Params: { id: string }; Body: Question }>, reply: FastifyReply) {
    const question = await this.questionsService.updateQuestion(request.params.id, request.body);

    reply.success(question, HttpStatusCode.ok);
  }

  async deleteQuestion(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const question = await this.questionsService.deleteQuestion(request.params.id);

    reply.success(question, HttpStatusCode.ok);
  }
}
