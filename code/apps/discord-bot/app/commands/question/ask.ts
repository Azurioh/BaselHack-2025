import type { CreateLocalQuestionBody } from '@baselhack/shared';
import type { CommandInteraction } from 'discord.js';
import type Client from '@/client';
import { askLocalQuestionToAPI } from '@/utils/api-wrapper';

/**
 * @description Handle the 'ask' subcommand
 * @param interaction The interaction
 * @param client The Client instance
 */
export async function handleAsk(interaction: CommandInteraction, client: Client): Promise<void> {
  if (!interaction.isChatInputCommand()) return;

  const voiceState = interaction.guild?.voiceStates.cache.get(interaction.user.id);
  const voiceChannel = voiceState?.channel;

  if (!voiceChannel) {
    await interaction.reply({
      content: 'You must be in a voice channel / meeting to ask a local question.',
      ephemeral: true,
    });
    return;
  }

  const title = interaction.options.getString('title', true);
  const description = interaction.options.getString('description', true);
  const anonymous = interaction.options.getBoolean('anonymous', false);
  const memberDiscordIds = voiceChannel.members.map((member) => member.id);

  const body: CreateLocalQuestionBody = {
    title,
    description,
    anonymous: anonymous ?? false,
    memberDiscordIds,
  };

  try {
    const { question: newQuestion, notFoundUserIds } = await askLocalQuestionToAPI(client, interaction.user.id, body);

    notFoundUserIds.map(async (userId) => {
      const member = await interaction.guild?.members.fetch(userId);
      if (!member) return;
      await member.send({
        content: `You have been tagged in a local question!
      **Title:** ${newQuestion.title}
      **Description:** ${newQuestion.description}
      **Anonymous:** ${newQuestion.anonymous}
      `,
      });
    });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'Failed to ask local question',
      ephemeral: true,
    });
    return;
  }

  await interaction.reply({
    content: `Question created!\n**Title:** ${title}\n**Description:** ${description}\n**Anonymous:** ${anonymous}`,
    ephemeral: true,
  });
}
