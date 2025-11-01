import type { CommandInteraction } from 'discord.js';
import CommandAbstract from '@/abstractCommand';
import type Client from '@/client';
import { ModalEnum } from '@/enums/modal-enums';

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
    const modal = client.getModals().get(ModalEnum.ANSWER_QUESTION);
    if (modal) {
      await interaction.showModal(modal.build());
    } else {
      await interaction.reply({ content: 'Unknown modal, please contact the developers.', ephemeral: true });
    }
  }
}

export default Ping;
