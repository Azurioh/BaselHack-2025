import type { CommandInteraction } from 'discord.js';
import CommandAbstract from '@/abstractCommand';
import type Client from '@/client';

/**
 * @class Ping
 * @description The ping command, that just reply with "Pong!"
 */
class Ping extends CommandAbstract {
  /**
   * Constructor to set the attributes of the abstract class
   */
  constructor() {
    super('ping', 'Reply pong', [], BigInt(0));
  }

  /**
   * @description Reply to the user with "Pong!"
   * @param interaction The interaction
   * @param _ The Client instance (unused)
   */
  protected async handle(interaction: CommandInteraction, _: Client): Promise<void> {
    await interaction.reply('Pong!');
  }
}

export default Ping;
