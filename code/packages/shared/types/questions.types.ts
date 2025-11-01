export type Answer = {
  id: string;
  userId: string;
  questionId: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Question = {
  title: string;
  description: string;
  roleAccess?: string[];
  userAccess?: string[];
  anonymous: boolean;
  deadline: Date;
  answers: Answer[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};
