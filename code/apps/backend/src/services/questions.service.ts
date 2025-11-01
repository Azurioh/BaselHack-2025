import type { Answer, CreateLocalQuestionBody, Question } from '@baselhack/shared/types/questions.types';
import type { QuestionsRepository } from '@repositories/questions.repository';
import type { UserRepository } from '@repositories/user.repository';
import { type Filter, ObjectId, type WithId } from 'mongodb';

export class QuestionsService {
  private questionsRepository: QuestionsRepository;
  private userRepository: UserRepository;

  constructor(questionsRepository: QuestionsRepository, userRepository: UserRepository) {
    this.questionsRepository = questionsRepository;
    this.userRepository = userRepository;
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

  async listAllQuestions(id: string, filter?: Filter<Question>) {
    const questions = await this.questionsRepository.listAllQuestions(filter);
    const questionsToBeAnswered: Question[] = [];
    const answeredQuestions: Question[] = [];

    for (const question of questions) {
      if (!question.answers || question.answers.length === 0) {
        questionsToBeAnswered.push(question);
        continue;
      }
      if (question.answers.find((answer) => answer.userId?.toString() === id)) {
        answeredQuestions.push(question);
      } else {
        questionsToBeAnswered.push(question);
      }
    }
    return { questionsToBeAnswered, answeredQuestions };
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

  async createAnswer(
    questionId: string,
    answer: {
      userId?: string;
      discordUserId?: string;
      answer: string;
    },
  ) {
    const { userId, discordUserId, ...restAnswer } = answer;
    const data: Answer = {
      ...restAnswer,
      questionId: new ObjectId(questionId),
      ...(userId ? { userId: new ObjectId(userId) } : { discordUserId }),
      id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newAnswer = await this.questionsRepository.createAnswer(questionId, data);

    return newAnswer;
  }

  async findAnswerByQuestionId(questionId: string, userId: string) {
    const answer = await this.questionsRepository.findAnswerByQuestionId(questionId, userId);

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

  async createLocalQuestion(
    question: CreateLocalQuestionBody,
    createdBy: string,
  ): Promise<{ question: WithId<Question>; notFoundUserIds: string[] }> {
    const userAccess = await this.userRepository.listAllUsers({ discordId: { $in: question.memberDiscordIds } });
    let notFoundUserIds: string[] = [];

    if (question.memberDiscordIds.length !== userAccess.length) {
      notFoundUserIds = question.memberDiscordIds.filter((id) => !userAccess.find((user) => user.discordId === id));
    }

    const data: Question = {
      title: question.title,
      description: question.description,
      category: 'local',
      anonymous: question.anonymous,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hour
      userAccess: userAccess.map((user) => user._id),
      discordUserAccess: notFoundUserIds,
      answers: [],
      createdBy: new ObjectId(createdBy),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.questionsRepository.createQuestion(data);

    if (!result.insertedId) {
      throw new Error('Failed to create question');
    }

    const createdQuestion = await this.questionsRepository.findQuestionById(result.insertedId.toString());

    if (!createdQuestion) {
      throw new Error('Failed to retrieve created question');
    }

    return { question: createdQuestion, notFoundUserIds };
  }

  async generateConcense(questionId: string) {
    const question = await this.findQuestionById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    if (question.answers.length === 0) {
      throw new Error('Question has no answers');
    }

    let concense = await this.questionsRepository.generateConcense(question);
    concense = concense.replace(/```json\n|```/g, '');
    concense = JSON.parse(concense);

    return concense;
  }
}
