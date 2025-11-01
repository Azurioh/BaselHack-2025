import type { User } from '@baselhack/shared/types/user.types';
import { ObjectId } from '@fastify/mongodb';
import type { QuestionsRepository } from '@repositories/questions.repository';
import type { UserRepository } from '@repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;
  private questionsRepository: QuestionsRepository;

  constructor(userRepository: UserRepository, questionsRepository: QuestionsRepository) {
    this.userRepository = userRepository;
    this.questionsRepository = questionsRepository;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findUserById(id);

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);

    return user;
  }

  async updateUser(id: string, user: User) {
    const updatedUser = await this.userRepository.updateUser(id, user);

    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userRepository.deleteUser(id);

    return deletedUser;
  }

  async listUserQuestions(id: string) {
    const questions = await this.questionsRepository.listAllQuestions({ createdBy: new ObjectId(id) });

    return questions;
  }

  async listUserAnswers(id: string, role: string) {
    const questions = await this.questionsRepository.listAllQuestions({
      $or: [{ userAccess: new ObjectId(id) }, { roleAccess: role }],
    });
    const answers = questions.map((question) => question.answers.find((answer) => answer.userId.toString() === id));

    return answers;
  }
}
