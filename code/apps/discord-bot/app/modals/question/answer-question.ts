import { type ModalSubmitInteraction, TextInputStyle } from 'discord.js';
import type Client from '@/client';
import { ModalEnum } from '@/enums/modal-enums';
import { ModalAbstract, ModalInput } from '@/modals';

class AnswerQuestionModal extends ModalAbstract {
  constructor() {
    super(ModalEnum.ANSWER_QUESTION, 'Answer Question', 'Answer a question');

    this.addInput(new ModalInput('answer', 'answer', true, TextInputStyle.Paragraph, 'Answer', 1000, 1));
  }

  async run(interaction: ModalSubmitInteraction, _client: Client): Promise<void> {
    await interaction.deferReply({ ephemeral: true });

    const answer = interaction.fields.getTextInputValue('answer');

    console.log(answer);

    await interaction.followUp({
      content: 'Answer submitted!',
      ephemeral: true,
    });
  }
}

export default AnswerQuestionModal;
