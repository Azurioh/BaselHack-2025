import type { ButtonInteraction } from 'discord.js';
import type Client from '@/client';
import { ButtonEnum } from '@/enums/button-enums';
import { ModalEnum } from '@/enums/modal-enums';
import { ButtonAbstract } from '..';

class AnswerQuestionButton extends ButtonAbstract {
  constructor() {
    super(ButtonEnum.ANSWER_QUESTION, 'Answer Question');
  }

  async run(interaction: ButtonInteraction, client: Client): Promise<void> {
    const modal = client.getModals().get(ModalEnum.ANSWER_QUESTION);

    if (modal) {
      await interaction.showModal(modal.build());
    } else {
      await interaction.editReply({ content: 'Unknown modal, please contact the developers.' });
    }
  }
}

export default AnswerQuestionButton;
