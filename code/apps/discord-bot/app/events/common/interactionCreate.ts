import { type BaseInteraction, Events } from 'discord.js';
import EventAbstract from '@/abstractEvent';
import type Client from '@/client';

/**
 * @class InteractionCreate
 * @description InteractionCreate event, triggered when a interaction is created (https://discord.com/developers/docs/interactions/receiving-and-responding#interactions)
 */
class InteractionCreate extends EventAbstract {
  constructor() {
    super(Events.InteractionCreate);
  }

  /**
   * @description Fetch the interaction file, and execute it
   *
   * @param client The Client instance
   * @param interaction The interaction
   */
  async run(client: Client, interaction: BaseInteraction): Promise<void> {
    const file = await this.getFileToLoad(client, interaction);

    if (!file) {
      if (interaction.isChatInputCommand()) {
        await interaction.reply({ content: 'Interaction inconnu, veuillez contacter les développeurs.' });
      }
      return;
    }
    file.run(interaction, client);
  }

  /**
   * Get the interaction to execute depending on its type
   *
   * @param client The Client instance
   * @param interaction The interaction
   */
  private async getFileToLoad(client: Client, interaction: BaseInteraction) {
    if (interaction.isChatInputCommand()) {
      if (!interaction.guild) {
        await interaction.reply({
          content: 'Les commandes ne peuvent être exécuté uniquement sur un serveur Discord.',
        });
        return null;
      }
      return client.getCommands().get(interaction.commandName);
    }
    return null;
  }
}

export default InteractionCreate;
