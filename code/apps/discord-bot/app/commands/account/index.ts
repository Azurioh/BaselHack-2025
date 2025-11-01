import type { CommandInteraction } from 'discord.js';
import CommandAbstract from '@/abstractCommand';
import type Client from '@/client';
import { defaultHandle } from './default';
import { handleLink } from './link';
import { subcommandOptions } from './options';
import { handleUnlink } from './unlink';

/**
 * @class Account
 * @description The account command with subcommands: link, unlink
 */
class Account extends CommandAbstract {
  /**
   * Constructor to set the attributes of the abstract class and register subcommands
   */
  constructor() {
    super('account', 'Manage your accounts', subcommandOptions, BigInt(0));

    // Register subcommand handlers
    this.registerSubcommand('link', handleLink);
    this.registerSubcommand('unlink', handleUnlink);
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

export default Account;
