import type { CommandInteraction } from 'discord.js';
import type Client from '@/client';

/**
 * @description Handle the 'list' subcommand
 * @param interaction The interaction
 * @param _ The Client instance (unused)
 */
export async function handleList(interaction: CommandInteraction, _: Client): Promise<void> {
  if (!interaction.isChatInputCommand()) return;

  const page = interaction.options.getInteger('page') ?? 1;

  // Your logic to fetch questions here
  // For example: const questions = await questionService.list(interaction.user.id, page);

  await interaction.reply({
    content: `Listing questions (page ${page})...\n_Implementation pending_`,
    ephemeral: true,
  });
}
