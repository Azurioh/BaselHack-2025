import type { CommandInteraction } from 'discord.js';
import CommandAbstract from '@/abstractCommand';
import type Client from '@/client';
import { handleAsk } from './ask';
import { defaultHandle } from './default';
import { subcommandOptions } from './options';

/**
 * @class Question
 * @description The question command with subcommands: ask
 */
class Question extends CommandAbstract {
  /**
   * Constructor to set the attributes of the abstract class and register subcommands
   */
  constructor() {
    super('question', 'Manage your questions', subcommandOptions, BigInt(0));

    // Register subcommand handlers
    this.registerSubcommand('ask', handleAsk);
  }

  /**
   * @description Default handler when no subcommand is provided
   * @param interaction The interaction
   * @param client The Client instance (unused)
   */
  protected async handle(interaction: CommandInteraction, client: Client): Promise<void> {
    await defaultHandle(interaction, client);
  }
}

export default Question;
