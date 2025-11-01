import type { Answer, Question } from '@baselhack/shared/types/questions.types';
import { MongoCollections } from '@enums/mongo-collections-enums';
import { type Db, type Filter, ObjectId } from 'mongodb';

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
    const question = await this.db.collection<Question>(MongoCollections.QUESTIONS).findOne({ _id: new ObjectId(id) });

    return question;
  }

  async updateQuestion(id: string, question: Question) {
    const updatedQuestion = await this.db
      .collection<Question>(MongoCollections.QUESTIONS)
      .updateOne({ _id: new ObjectId(id) }, { $set: question });

    return updatedQuestion;
  }

  async deleteQuestion(id: string) {
    const deletedQuestion = await this.db
      .collection<Question>(MongoCollections.QUESTIONS)
      .deleteOne({ _id: new ObjectId(id) });

    return deletedQuestion;
  }

  async createAnswer(questionId: string, answer: Answer) {
    const newAnswer = await this.db
      .collection<Question>(MongoCollections.QUESTIONS)
      .updateOne({ _id: new ObjectId(questionId) }, { $push: { answers: answer } });

    return newAnswer;
  }

  async findAnswerByQuestionId(questionId: string, userId: string) {
    const answer = await this.db
      .collection<Question>(MongoCollections.QUESTIONS)
      .findOne({ _id: new ObjectId(questionId), 'answers.userId': userId });

    return answer?.answers[0];
  }

  async listAnswersByQuestionId(questionId: string) {
    const question = await this.findQuestionById(questionId);

    return question?.answers;
  }

  async updateAnswer(questionId: string, answerId: string, answer: Answer) {
    const updatedAnswer = await this.db
      .collection<Question>(MongoCollections.QUESTIONS)
      .updateOne(
        { _id: new ObjectId(questionId), 'answers.id': answerId },
        { $set: { 'answers.$.answer': answer.answer } },
      );

    return updatedAnswer;
  }

  async deleteAnswer(questionId: string, answerId: string) {
    const deletedAnswer = await this.db
      .collection<Question>(MongoCollections.QUESTIONS)
      .updateOne(
        { _id: new ObjectId(questionId) },
        { $pull: { answers: { id: new ObjectId(answerId) } } as Record<string, unknown> },
      );

    return deletedAnswer;
  }
}
