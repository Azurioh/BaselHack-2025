import dotenv from 'dotenv';

dotenv.config();

/**
 * @interface Environment
 * @description This interface defines the structure of the environment variables used in the application.
 */
export interface Environment {
  DISCORD_TOKEN: string /*!< Token of the discord client */;
}

const variables: { [key: string]: string | undefined } = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
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

export const environment: Environment = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN as string,
};
