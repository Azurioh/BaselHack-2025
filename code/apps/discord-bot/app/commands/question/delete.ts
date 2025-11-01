import type { CommandInteraction } from 'discord.js';
import type Client from '@/client';

/**
 * @description Handle the 'delete' subcommand
 * @param interaction The interaction
 * @param _ The Client instance (unused)
 */
export async function handleDelete(interaction: CommandInteraction, _: Client): Promise<void> {
  if (!interaction.isChatInputCommand()) return;

  const questionId = interaction.options.getString('question_id', true);

  // Your logic to delete the question here
  // For example: await questionService.delete(questionId, interaction.user.id);

  await interaction.reply({
    content: `Question ${questionId} has been deleted.`,
    ephemeral: true,
  });
}
