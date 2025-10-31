import { Errors } from '@baselhack/shared/enums/errors';
import { HttpStatusCode } from '@baselhack/shared/enums/http-status';
import type { UserService } from '@services/user.service';
import type { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUserMe(request: FastifyRequest, reply: FastifyReply) {
    if (!request.user) {
      return reply.error('Unauthorized', HttpStatusCode.unauthorized, Errors.UNAUTHORIZED);
    }

    const user = await this.userService.findUserById(request.user.id);

    reply.success(user);
  }

  async listMeQuestions(request: FastifyRequest, reply: FastifyReply) {
    if (!request.user) {
      return reply.error('Unauthorized', HttpStatusCode.unauthorized, Errors.UNAUTHORIZED);
    }

    const questions = await this.userService.listUserQuestions(request.user.id);

    reply.success(questions);
  }

  async listMeAnswers(request: FastifyRequest, reply: FastifyReply) {
    if (!request.user) {
      return reply.error('Unauthorized', HttpStatusCode.unauthorized, Errors.UNAUTHORIZED);
    }

    const answers = await this.userService.listUserAnswers(request.user.id, request.user.role);

    reply.success(answers);
  }

  async getUserById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const user = await this.userService.findUserById(request.params.id);

    reply.success(user);
  }

  async listUserQuestions(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const questions = await this.userService.listUserQuestions(request.params.id);

    reply.success(questions);
  }

  async listUserAnswers(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const answers = await this.userService.listUserAnswers(request.params.id, request.user?.role);

    reply.success(answers);
  }
}
