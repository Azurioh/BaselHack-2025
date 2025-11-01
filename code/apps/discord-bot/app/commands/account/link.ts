import type { CommandInteraction } from 'discord.js';
import type Client from '@/client';
import { linkAccountToAPI, loginToAPI } from '@/utils/api-wrapper';

/**
 * @function handleLink
 * @description Handle the link command
 *
 * @param interaction The interaction
 * @param _ The Client instance (unused)
 */
export async function handleLink(interaction: CommandInteraction, client: Client): Promise<void> {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const discordId = interaction.user.id;
  const email = interaction.options.getString('email', true);
  const password = interaction.options.getString('password', true);

  try {
    const data = await loginToAPI(email, password);
    console.log(discordId);
    const token = await linkAccountToAPI(data.accessToken, discordId);

    client.setSession(discordId, token);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'Failed to link account',
      ephemeral: true,
    });
    return;
  }

  await interaction.reply({
    content: 'Account linked!',
    ephemeral: true,
  });
}
