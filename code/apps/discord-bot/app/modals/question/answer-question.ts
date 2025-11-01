import { type ModalSubmitInteraction, TextInputStyle } from 'discord.js';
import type Client from '@/client';
import { ModalEnum } from '@/enums/modal-enums';
import { ModalAbstract, ModalInput } from '@/modals';
import { answerQuestion } from '@/utils/api-wrapper';

class AnswerQuestionModal extends ModalAbstract {
  constructor() {
    super(ModalEnum.ANSWER_QUESTION, 'Answer Question', 'Answer a question');

    this.addInput(new ModalInput('answer', 'answer', true, TextInputStyle.Paragraph, 'Answer', 1000, 1));
  }

  async run(interaction: ModalSubmitInteraction, client: Client): Promise<void> {
    await interaction.deferReply({ ephemeral: true });

    if (!interaction.channelId) {
      await interaction.followUp({
        content: 'Unknown channel, please contact the developers.',
        ephemeral: true,
      });
      return;
    }

    const answer = interaction.fields.getTextInputValue('answer');
    console.log(JSON.stringify(client.getQuestions(), null, 2));
    const questionId = client.getQuestion(interaction.channelId);

    if (!questionId) {
      await interaction.followUp({
        content: 'Unknown question, please contact the developers.',
        ephemeral: true,
      });
      return;
    }

    console.log(answer);

    try {
      await answerQuestion(client, interaction.user.id, questionId, answer);

      await interaction.followUp({
        content: 'Answer submitted!',
        ephemeral: true,
      });
    } catch (_error) {
      await interaction.followUp({
        content: 'Failed to answer question, please contact the developers.',
        ephemeral: true,
      });
    }
  }
}

export default AnswerQuestionModal;
