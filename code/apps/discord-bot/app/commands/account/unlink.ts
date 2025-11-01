import type { CommandInteraction } from 'discord.js';
import type Client from '@/client';
import { unlinkAccountFromAPI } from '@/utils/api-wrapper';

/**
 * @function handleUnlink
 * @description Handle the unlink command
 *
 * @param interaction The interaction
 * @param _ The Client instance (unused)
 */
export async function handleUnlink(interaction: CommandInteraction, client: Client): Promise<void> {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const discordId = interaction.user.id;
  const token = client.getSession(discordId);

  if (!token) {
    await interaction.reply({
      content: 'No account linked to your Discord account. Please link your account first.',
      ephemeral: true,
    });
    return;
  }

  try {
    await unlinkAccountFromAPI(token, discordId);
    client.deleteSession(discordId);
  } catch {
    await interaction.reply({
      content: 'Failed to unlink account',
      ephemeral: true,
    });
    return;
  }
  await interaction.reply({
    content: 'Account unlinked!',
    ephemeral: true,
  });
}
