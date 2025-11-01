import type { CommandInteraction } from 'discord.js';
import type Client from '@/client';

/**
 * @description Default handler when no subcommand is provided
 * @param interaction The interaction
 * @param _ The Client instance (unused)
 */
export async function defaultHandle(interaction: CommandInteraction, _: Client): Promise<void> {
  await interaction.reply({
    content: 'Please use a subcommand: `/account link` or `/account unlink`',
    ephemeral: true,
  });
}
