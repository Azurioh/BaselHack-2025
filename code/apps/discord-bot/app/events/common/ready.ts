import { type ClientUser, Events } from 'discord.js';
import EventAbstract from '@/abstractEvent';
import type Client from '@/client';

/**
 * @class Ready
 * @description Ready event, triggered when the bot is logged
 */
class Ready extends EventAbstract {
  constructor() {
    super(Events.ClientReady, true);
  }

  /**
   * @description Print a message in the terminal to give the Discord tag of the bot
   *
   * @param client The Client instance
   */
  async run(client: Client): Promise<void> {
    const discordClient: ClientUser | null = client.getDiscordClient().user;

    if (!discordClient) {
      console.error('Fail to fetch the user of the bot.');
    } else {
      console.log(`Bot started using the following user: ${discordClient.tag}.`);
    }
  }
}

export default Ready;
