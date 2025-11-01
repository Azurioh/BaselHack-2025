import type { ObjectId } from 'mongodb';

export type Answer = {
  id: ObjectId;
  userId?: ObjectId;
  discordUserId?: string;
  questionId: ObjectId;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Question = {
  title: string;
  description: string;
  category: string;
  roleAccess?: string[];
  userAccess?: ObjectId[];
  discordUserAccess?: string[];
  anonymous: boolean;
  deadline: Date;
  answers: Answer[];
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateLocalQuestionBody = {
  title: string;
  description: string;
  anonymous: boolean;
  memberDiscordIds: string[];
};
