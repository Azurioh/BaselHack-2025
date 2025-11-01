import type { CreateLocalQuestionBody, Question } from '@baselhack/shared';
import type { ObjectId } from 'mongodb';
import type Client from '@/client';
import { environment } from './environment';

/**
 * @function fetchAPI
 * @description Fetch data from the API
 *
 * @param {string} url The URL to fetch data from
 * @param {string} method The HTTP method to use
 * @param {Record<string, string>} headers The headers to send with the request
 * @param {string} body The body to send with the request
 */
const fetchAPI = async (
  client: Client,
  discordId: string,
  url: string,
  method: string,
  headers: Record<string, string>,
  body: string,
) => {
  const token = client.getSession(discordId);

  if (!token) {
    throw new Error(`No token found for Discord user ${discordId}. Please link your account first.`);
  }

  const response = await fetch(`${environment.API_URL}${url}`, {
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  return response;
};

/**
 * @function loginToAPI
 * @description Login to the API
 *
 * @param {string} email The email of the user
 * @param {string} password The password of the user
 * @returns {Promise<{ accessToken: string; refreshToken: string }>} The access token and refresh token
 */
export const loginToAPI = async (
  email: string,
  password: string,
): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await fetch(`${environment.API_URL}/auth/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to login to the API');
  }

  const data: { status: string; data: { accessToken: string; refreshToken: string } } = await response.json();

  return data.data;
};

/**
 * @function linkAccountToAPI
 * @description Link an account to the API
 *
 * @param {string} accessToken The access token of the user
 * @param {string} discordId The Discord ID of the user
 * @returns {Promise<string>} A token to use for the API
 */
export const linkAccountToAPI = async (accessToken: string, discordId: string): Promise<string> => {
  const response = await fetch(`${environment.API_URL}/auth/v1/link-discord-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ discordId }),
  });

  if (!response.ok) {
    console.error(JSON.stringify(await response.json(), null, 2));
  }

  const data: { status: string; data: { token: string } } = await response.json();
  return data.data.token;
};

/**
 * @function unlinkAccountFromAPI
 * @description Unlink an account from the API
 *
 * @param {string} accessToken The access token of the user
 * @param {string} discordId The Discord ID of the user
 * @returns {Promise<void>} A promise that resolves when the account is unlinked
 */
export const unlinkAccountFromAPI = async (accessToken: string, discordId: string): Promise<void> => {
  const response = await fetch(`${environment.API_URL}/auth/v1/unlink-discord-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ discordId }),
  });

  if (!response.ok) {
    console.error(JSON.stringify(await response.json(), null, 2));
    throw new Error('Failed to unlink account from the API');
  }
};

/**
 * @function askLocalQuestionToAPI
 * @description Ask a local question to the API
 *
 * @param {string} discordId The Discord ID of the user
 * @param {string} description The description of the question
 * @param {string} question The question
 * @param {string[]} memberDiscordIds The Discord IDs of the members to ask the question to
 * @param {Date} deadline The deadline of the question
 * @param {boolean} anonymous Whether the question is anonymous
 * @returns {Promise<{ question: Question; notFoundUserIds: string[] }>} The question and the IDs of the users that were not found
 */
export const askLocalQuestionToAPI = async (
  client: Client,
  discordId: string,
  body: CreateLocalQuestionBody,
): Promise<{ question: Question & { _id: ObjectId }; notFoundUserIds: string[] }> => {
  const response = await fetchAPI(
    client,
    discordId,
    '/questions/v1/local',
    'POST',
    {
      'Content-Type': 'application/json',
    },
    JSON.stringify(body),
  );

  if (!response.ok) {
    console.error(JSON.stringify(await response.json(), null, 2));
    throw new Error('Failed to ask local question to the API');
  }

  const data: { status: string; data: { question: Question & { _id: ObjectId }; notFoundUserIds: string[] } } =
    await response.json();
  console.log(data);
  return data.data;
};

export const answerQuestion = async (
  client: Client,
  discordId: string,
  questionId: string,
  answer: string,
): Promise<void> => {
  const token = client.getSession(discordId);

  const response = await fetch(`${environment.API_URL}/questions/v1/${questionId}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : { discord_secret: environment.API_SECRET }),
    },
    body: JSON.stringify({ answer, ...(token ? {} : { discordUserId: discordId }) }),
  });

  if (!response.ok) {
    console.error(JSON.stringify(await response.json(), null, 2));
    throw new Error('Failed to answer question to the API');
  }

  console.log(await response.json());
};
