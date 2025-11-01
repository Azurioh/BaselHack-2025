import dotenv from 'dotenv';

dotenv.config();

/**
 * @interface Environment
 * @description This interface defines the structure of the environment variables used in the application.
 */
export interface Environment {
  NODE_ENV: string;
  PORT: number;
  API_BASE_URL: string;

  MONGO_URI: string;
  MONGO_DATABASE: string;

  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_RESET_PASSWORD_SECRET: string;

  ADMIN_SECRET: string;
  DISCORD_SECRET: string;
}

const variables: { [key: string]: string | undefined } = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  API_BASE_URL: process.env.API_BASE_URL,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_RESET_PASSWORD_SECRET: process.env.JWT_RESET_PASSWORD_SECRET,
  ADMIN_SECRET: process.env.ADMIN_SECRET,
  DISCORD_SECRET: process.env.DISCORD_SECRET,
};

for (const [key, value] of Object.entries(variables)) {
  if (value === undefined) {
    console.error(`\r\x1b[31mError:\x1b[0m Variable ${key} is not defined`);
    process.exit(1);
  }
  if (value === '') {
    console.error(`\r\x1b[31mError:\x1b[0m Variable ${key} is empty`);
    process.exit(1);
  }
}

const port = Number(variables.PORT);

if (Number.isNaN(port)) {
  console.error('\r\x1b[31mError:\x1b[0m Variable PORT is not a number');
  process.exit(1);
}

export const environment: Environment = {
  PORT: port,
  NODE_ENV: process.env.NODE_ENV as string,
  API_BASE_URL: process.env.API_BASE_URL as string,
  MONGO_URI: process.env.MONGO_URI as string,
  MONGO_DATABASE: process.env.MONGO_DATABASE as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  JWT_RESET_PASSWORD_SECRET: process.env.JWT_RESET_PASSWORD_SECRET as string,
  ADMIN_SECRET: process.env.ADMIN_SECRET as string,
  DISCORD_SECRET: process.env.DISCORD_SECRET as string,
};
