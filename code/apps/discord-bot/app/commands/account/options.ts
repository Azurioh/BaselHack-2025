import { ApplicationCommandOptionType } from 'discord.js';

/**
 * @description Define the subcommand options for Discord API registration
 * When using subcommands, they must be defined in the options array
 */
export const subcommandOptions = [
  {
    type: ApplicationCommandOptionType.Subcommand,
    name: 'link',
    description: 'Link your account to the Discord server',
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: 'email',
        description: 'The email of the account',
        required: true,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: 'password',
        description: 'The password of the account',
        required: true,
      },
    ],
  },
  {
    type: ApplicationCommandOptionType.Subcommand,
    name: 'unlink',
    description: 'Unlink your account from the Discord server',
  },
];
