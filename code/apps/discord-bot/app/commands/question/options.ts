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
];
