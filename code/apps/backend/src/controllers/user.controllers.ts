import type { UserService } from '@services/user.service';
import type { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUserMe(request: FastifyRequest, reply: FastifyReply) {
    const user = await this.userService.findUserById(request.user?.id);

    reply.success(user);
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
