import type { Answer, Question } from '@baselhack/shared/types/questions.types';
import type { QuestionsRepository } from '@repositories/questions.repository';
import { ObjectId, type Filter } from 'mongodb';

export class QuestionsService {
  private questionsRepository: QuestionsRepository;

  constructor(questionsRepository: QuestionsRepository) {
    this.questionsRepository = questionsRepository;
  }

  async createQuestion(question: Question) {
    const data: Question = {
      ...question,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newQuestion = await this.questionsRepository.createQuestion(data);

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

  async createAnswer(questionId: string, answer: Answer) {
    const data: Answer = {
      ...answer,
      id: new ObjectId().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newAnswer = await this.questionsRepository.createAnswer(questionId, data);

    return newAnswer;
  }

  async findAnswerByQuestionId(questionId: string) {
    const answer = await this.questionsRepository.findAnswerByQuestionId(questionId);

    return answer;
  }

  async listAnswersByQuestionId(questionId: string) {
    const answers = await this.questionsRepository.listAnswersByQuestionId(questionId);

    return answers;
  }

  async updateAnswer(questionId: string, answerId: string, answer: Answer) {
    const updatedAnswer = await this.questionsRepository.updateAnswer(questionId, answerId, answer);

    return updatedAnswer;
  }

  async deleteAnswer(questionId: string, answerId: string) {
    const deletedAnswer = await this.questionsRepository.deleteAnswer(questionId, answerId);

    return deletedAnswer;
  }
}
