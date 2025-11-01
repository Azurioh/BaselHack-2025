import { ActionRowBuilder, type ButtonBuilder, type CommandInteraction } from 'discord.js';
import CommandAbstract from '@/abstractCommand';
import type Client from '@/client';
import { ButtonEnum } from '@/enums/button-enums';

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
   * @param client The Client instance (unused)
   */
  protected async handle(interaction: CommandInteraction, client: Client): Promise<void> {
    const button = client.getButtons().get(ButtonEnum.ANSWER_QUESTION);
    if (button) {
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button.build());
      await interaction.reply({ content: 'Button found!', components: [row] });
    } else {
      await interaction.reply({ content: 'Unknown modal, please contact the developers.', ephemeral: true });
    }
  }
}

export default Ping;
