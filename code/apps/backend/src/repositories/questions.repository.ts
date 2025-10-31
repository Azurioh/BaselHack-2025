import type { Question } from '@baselhack/shared/types/questions.types';
import { MongoCollections } from '@enums/mongo-collections-enums';
import type { Db, Filter } from 'mongodb';

export class QuestionsRepository {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async createQuestion(question: Question) {
    const newQuestion = await this.db.collection<Question>(MongoCollections.QUESTIONS).insertOne({ ...question });

    return newQuestion;
  }

  async listAllQuestions(filter?: Filter<Question>) {
    const questions = await this.db
      .collection<Question>(MongoCollections.QUESTIONS)
      .find(filter || {})
      .toArray();

    return questions;
  }

  async findQuestionById(id: string) {
    const question = await this.db.collection<Question>(MongoCollections.QUESTIONS).findOne({ id });

    return question;
  }

  async updateQuestion(id: string, question: Question) {
    const updatedQuestion = await this.db
      .collection<Question>(MongoCollections.QUESTIONS)
      .updateOne({ id }, { $set: question });

    return updatedQuestion;
  }

  async deleteQuestion(id: string) {
    const deletedQuestion = await this.db.collection<Question>(MongoCollections.QUESTIONS).deleteOne({ id });

    return deletedQuestion;
  }

  async listAnswersByQuestionId(questionId: string) {
    const question = await this.findQuestionById(questionId);

    return question?.answers;
  }
}
