import { HttpStatusCode } from '@baselhack/shared/enums/http-status';
import type { Answer, Question } from '@baselhack/shared/types/questions.types';
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

  async findQuestionById(request: FastifyRequest<{ Params: { question_id: string } }>, reply: FastifyReply) {
    const question = await this.questionsService.findQuestionById(request.params.question_id);

    reply.success(question, HttpStatusCode.ok);
  }

  async updateQuestion(request: FastifyRequest<{ Params: { question_id: string }; Body: Question }>, reply: FastifyReply) {
    const question = await this.questionsService.updateQuestion(request.params.question_id, request.body);

    reply.success(question, HttpStatusCode.ok);
  }

  async deleteQuestion(request: FastifyRequest<{ Params: { question_id: string } }>, reply: FastifyReply) {
    const question = await this.questionsService.deleteQuestion(request.params.question_id);

    reply.success(question, HttpStatusCode.ok);
  }

  async createAnswer(request: FastifyRequest<{ Params: { question_id: string }; Body: Answer }>, reply: FastifyReply) {
    const answer = await this.questionsService.createAnswer(request.params.question_id, request.body);

    reply.success(answer, HttpStatusCode.created);
  }

  async findAnswerByQuestionId(request: FastifyRequest<{ Params: { question_id: string } }>, reply: FastifyReply) {
    const answer = await this.questionsService.findAnswerByQuestionId(request.params.question_id);

    reply.success(answer, HttpStatusCode.ok);
  }

  async listAnswersByQuestionId(request: FastifyRequest<{ Params: { question_id: string } }>, reply: FastifyReply) {
    const answers = await this.questionsService.listAnswersByQuestionId(request.params.question_id);

    reply.success(answers, HttpStatusCode.ok);
  }

  async updateAnswer(request: FastifyRequest<{ Params: { question_id: string; answer_id: string }; Body: Answer }>, reply: FastifyReply) {
    const answer = await this.questionsService.updateAnswer(request.params.question_id, request.params.answer_id, request.body);

    reply.success(answer, HttpStatusCode.ok);
  }

  async deleteAnswer(request: FastifyRequest<{ Params: { question_id: string; answer_id: string } }>, reply: FastifyReply) {
    const answer = await this.questionsService.deleteAnswer(request.params.question_id, request.params.answer_id);

    reply.success(answer, HttpStatusCode.ok);
  }
}
