import { ApplicationCommandOptionType } from 'discord.js';

/**
 * @description Define the subcommand options for Discord API registration
 * When using subcommands, they must be defined in the options array
 */
export const subcommandOptions = [
  {
    type: ApplicationCommandOptionType.Subcommand,
    name: 'ask',
    description: 'Ask a new question',
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: 'title',
        description: 'The title of the question',
        required: true,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: 'description',
        description: 'The description of the question',
        required: true,
      },
      {
        type: ApplicationCommandOptionType.Boolean,
        name: 'anonymous',
        description: 'Whether the question is anonymous',
        required: false,
      },
    ],
  },
  {
    type: ApplicationCommandOptionType.Subcommand,
    name: 'list',
    description: 'List all your questions',
    options: [
      {
        type: ApplicationCommandOptionType.Integer,
        name: 'page',
        description: 'Page number to display',
        required: false,
      },
    ],
  },
  {
    type: ApplicationCommandOptionType.Subcommand,
    name: 'delete',
    description: 'Delete a question',
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: 'question_id',
        description: 'The ID of the question to delete',
        required: true,
      },
    ],
  },
];
