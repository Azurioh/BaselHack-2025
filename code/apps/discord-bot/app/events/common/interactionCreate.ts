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
    if (interaction.isChatInputCommand()) {
      if (interaction.guild) {
        const command = client.getCommands().get(interaction.commandName);
        if (command) {
          await command.run(interaction, client);
          return;
        }
      }
    }
    if (interaction.isModalSubmit()) {
      const modal = client.getModals().get(interaction.customId);
      if (modal) {
        await modal.run(interaction, client);
        return;
      }
    }
    if (interaction.isButton()) {
      const button = client.getButtons().get(interaction.customId);
      if (button) {
        await button.run(interaction, client);
        return;
      }
    }
    if (interaction.isRepliable()) {
      await interaction.reply({ content: 'Unknown interaction, please contact the developers.' });
    }
  }
}

export default InteractionCreate;
