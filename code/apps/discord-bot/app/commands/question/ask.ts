import type { CommandInteraction } from 'discord.js';
import type Client from '@/client';

/**
 * @description Handle the 'ask' subcommand
 * @param interaction The interaction
 * @param _ The Client instance (unused)
 */
export async function handleAsk(interaction: CommandInteraction, _: Client): Promise<void> {
  if (!interaction.isChatInputCommand()) return;

  const title = interaction.options.getString('title', true);
  const content = interaction.options.getString('content', true);

  // Your logic to save the question here
  // For example: await questionService.create({ title, content, userId: interaction.user.id });

  await interaction.reply({
    content: `Question created!\n**Title:** ${title}\n**Content:** ${content}`,
    ephemeral: true,
  });
}
