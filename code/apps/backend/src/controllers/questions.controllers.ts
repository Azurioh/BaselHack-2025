import { Errors } from '@baselhack/shared/enums/errors';
import { HttpStatusCode } from '@baselhack/shared/enums/http-status';
import type { Answer, CreateLocalQuestionBody, Question } from '@baselhack/shared/types/questions.types';
import { environment } from '@config/environment';
import type { QuestionsService } from '@services/questions.service';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { type Filter, ObjectId } from 'mongodb';

export class QuestionsController {
  private questionsService: QuestionsService;

  constructor(questionsService: QuestionsService) {
    this.questionsService = questionsService;
  }

  async createQuestion(
    request: FastifyRequest<{ Body: Omit<Question, 'createdBy'> & { createdBy: string } }>,
    reply: FastifyReply,
  ) {
    const question = await this.questionsService.createQuestion({
      ...request.body,
      createdBy: new ObjectId(request.body.createdBy),
    });

    reply.success(question, HttpStatusCode.created);
  }

  async listAllQuestions(
    request: FastifyRequest<{ User: { id: string }; Querystring: { filter?: Filter<Question> } }>,
    reply: FastifyReply,
  ) {
    const questions = await this.questionsService.listAllQuestions(request.user.id, request.query.filter);

    reply.success(questions, HttpStatusCode.ok);
  }

  async findQuestionById(request: FastifyRequest<{ Params: { question_id: string } }>, reply: FastifyReply) {
    const question = await this.questionsService.findQuestionById(request.params.question_id);

    reply.success(question, HttpStatusCode.ok);
  }

  async updateQuestion(
    request: FastifyRequest<{
      Params: { question_id: string };
      Body: Omit<Question, 'createdBy'> & { createdBy: string };
    }>,
    reply: FastifyReply,
  ) {
    const question = await this.questionsService.updateQuestion(request.params.question_id, {
      ...request.body,
      createdBy: new ObjectId(request.body.createdBy),
    });

    reply.success(question, HttpStatusCode.ok);
  }

  async deleteQuestion(request: FastifyRequest<{ Params: { question_id: string } }>, reply: FastifyReply) {
    const question = await this.questionsService.deleteQuestion(request.params.question_id);

    reply.success(question, HttpStatusCode.ok);
  }

  async createAnswer(
    request: FastifyRequest<{
      Headers: { discord_secret?: string };
      Params: { question_id: string };
      Body: { discordUserId?: string; answer: string };
    }>,
    reply: FastifyReply,
  ) {
    if (request.body.discordUserId && request.headers.discord_secret !== environment.DISCORD_SECRET) {
      return reply.error('Unauthorized', HttpStatusCode.unauthorized, Errors.UNAUTHORIZED);
    }

    let userId: string | undefined;
    if (request.user?.id) {
      userId = request.user.id;
    }

    const { discordUserId, answer: answerStr } = request.body;
    const answer = await this.questionsService.createAnswer(request.params.question_id, {
      answer: answerStr,
      ...(userId ? { userId } : { discordUserId }),
    });

    reply.success(answer, HttpStatusCode.created);
  }

  async findAnswerByQuestionId(request: FastifyRequest<{ Params: { question_id: string } }>, reply: FastifyReply) {
    const answer = await this.questionsService.findAnswerByQuestionId(request.params.question_id, request.user.id);

    reply.success(answer, HttpStatusCode.ok);
  }

  async listAnswersByQuestionId(request: FastifyRequest<{ Params: { question_id: string } }>, reply: FastifyReply) {
    const answers = await this.questionsService.listAnswersByQuestionId(request.params.question_id);

    reply.success(answers, HttpStatusCode.ok);
  }

  async updateAnswer(
    request: FastifyRequest<{ Params: { question_id: string; answer_id: string }; Body: Answer }>,
    reply: FastifyReply,
  ) {
    const answer = await this.questionsService.updateAnswer(
      request.params.question_id,
      request.params.answer_id,
      request.body,
    );

    reply.success(answer, HttpStatusCode.ok);
  }

  async deleteAnswer(
    request: FastifyRequest<{ Params: { question_id: string; answer_id: string } }>,
    reply: FastifyReply,
  ) {
    const answer = await this.questionsService.deleteAnswer(request.params.question_id, request.params.answer_id);

    reply.success(answer, HttpStatusCode.ok);
  }

  async createLocalQuestion(request: FastifyRequest<{ Body: CreateLocalQuestionBody }>, reply: FastifyReply) {
    const question = await this.questionsService.createLocalQuestion(request.body, request.user.id);

    reply.success(question, HttpStatusCode.created);
  }

  async generateConcense(request: FastifyRequest<{ Params: { question_id: string } }>, reply: FastifyReply) {
    const concense = await this.questionsService.generateConcense(request.params.question_id);

    reply.success(concense, HttpStatusCode.ok);
  }
}
