import type { Question } from '@baselhack/shared/types/questions.types';
import type { QuestionsRepository } from '@repositories/questions.repository';
import type { Filter } from 'mongodb';

export class QuestionsService {
  private questionsRepository: QuestionsRepository;

  constructor(questionsRepository: QuestionsRepository) {
    this.questionsRepository = questionsRepository;
  }

  async createQuestion(question: Question) {
    const newQuestion = await this.questionsRepository.createQuestion(question);

    return newQuestion;
  }

  async listAllQuestions(filter?: Filter<Question>) {
    const questions = await this.questionsRepository.listAllQuestions(filter);

    return questions;
  }

  async findQuestionById(id: string) {
    const question = await this.questionsRepository.findQuestionById(id);

    return question;
  }

  async updateQuestion(id: string, question: Question) {
    const updatedQuestion = await this.questionsRepository.updateQuestion(id, question);

    return updatedQuestion;
  }

  async deleteQuestion(id: string) {
    const deletedQuestion = await this.questionsRepository.deleteQuestion(id);

    return deletedQuestion;
  }
}
