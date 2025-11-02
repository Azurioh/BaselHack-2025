import type { Answer, Question } from '@baselhack/shared/types/questions.types';

const API_URL = import.meta.env.VITE_API_URL;

export const createQuestion = async (question: Question) => {
  const response = await fetch(`${API_URL}/questions/v1/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });

  return await response.json();
};

export const getAllQuestions = async () => {
  const response = await fetch(`${API_URL}/questions/v1/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const getQuestionById = async (id: string) => {
  const response = await fetch(`${API_URL}/questions/v1/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const updateQuestion = async (id: string, question: Question) => {
  const response = await fetch(`${API_URL}/questions/v1/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });

  return await response.json();
};

export const deleteQuestion = async (id: string) => {
  const response = await fetch(`${API_URL}/questions/v1/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const createAnswer = async (answer: { questionId: string; answer: string }) => {
  const response = await fetch(`${API_URL}/questions/v1/${answer.questionId}/answer`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answer: answer.answer }),
  });

  return await response.json();
};

export const getAnswerByQuestionId = async (questionId: string) => {
  const response = await fetch(`${API_URL}/questions/v1/${questionId}/answer`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const listAnswersByQuestionId = async (questionId: string) => {
  const response = await fetch(`${API_URL}/questions/v1/${questionId}/answers`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const updateAnswer = async (answer: Answer, answerId: string) => {
  const response = await fetch(`${API_URL}/questions/v1/${answer.questionId}/answer/${answerId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answer),
  });

  return await response.json();
};

export const deleteAnswer = async (questionId: string, answerId: string) => {
  const response = await fetch(`${API_URL}/questions/v1/${questionId}/answer/${answerId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};
