import type { CreateLocalQuestionBody } from '@baselhack/shared';
import type { ButtonBuilder, CommandInteraction } from 'discord.js';
import { ActionRowBuilder, EmbedBuilder } from 'discord.js';
import type Client from '@/client';
import { ButtonEnum } from '@/enums/button-enums';
import { askLocalQuestionToAPI } from '@/utils/api-wrapper';
import { environment } from '@/utils/environment';

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

    const questionId = newQuestion._id.toString();
    const websiteUrl = `${environment.WEBSITE_URL}/questions/${questionId}`;

    const createDMEmbed = (_userId: string) => {
      const embed = new EmbedBuilder()
        .setTitle('📝 New Local Question')
        .setDescription('You have been tagged in a local question!')
        .addFields(
          { name: '📌 Title', value: newQuestion.title, inline: true },
          { name: '📄 Description', value: newQuestion.description, inline: true },
          { name: '👤 Anonymous', value: newQuestion.anonymous ? 'Yes' : 'No', inline: false },
          { name: '🔗 View on Website', value: `[Click here](${websiteUrl})`, inline: true },
          {
            name: '💬 Answer on Discord',
            value: `[Jump to message](https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id})`,
            inline: true,
          },
        )
        .setColor(0x5865f2)
        .setTimestamp(new Date());

      return embed;
    };

    await Promise.all(
      memberDiscordIds
        .filter((userId) => !notFoundUserIds.includes(userId))
        .map(async (userId) => {
          try {
            const member = await interaction.guild?.members.fetch(userId);
            if (!member) return;

            const embed = createDMEmbed(userId);

            await member.send({
              embeds: [embed],
            });
          } catch (error) {
            console.error(`Failed to send DM to user ${userId}:`, error);
          }
        }),
    );

    const redirectEmbed = new EmbedBuilder()
      .setTitle('🔗 Redirecting to the channel')
      .setDescription(
        `You don't have an account linked to your Discord account. Please answer the question in the channel where it was asked.`,
      )
      .setColor(0x5865f2)
      .setTimestamp(new Date());

    redirectEmbed.addFields({ name: '🔗 Redirect to Channel', value: `<#${interaction.channelId}>`, inline: false });

    await Promise.all(
      notFoundUserIds.map(async (userId) => {
        const member = await interaction.guild?.members.fetch(userId);
        if (!member) return;

        await member.send({
          embeds: [redirectEmbed],
        });
      }),
    );

    const replyEmbed = new EmbedBuilder()
      .setTitle('✅ Question Created Successfully')
      .setDescription('Your local question has been created and sent to all members in the voice channel!')
      .addFields(
        { name: '📌 Title', value: title, inline: false },
        { name: '📄 Description', value: description, inline: false },
        { name: '👤 Anonymous', value: anonymous ? 'Yes' : 'No', inline: true },
        { name: '🔗 View on Website', value: `[Click here](${websiteUrl})`, inline: false },
      )
      .setColor(0x57f287)
      .setTimestamp(new Date());

    const replyComponents: ActionRowBuilder<ButtonBuilder>[] = [];

    const answerButton = client.getButtons().get(ButtonEnum.ANSWER_QUESTION)?.build();
    if (answerButton) {
      replyComponents.push(new ActionRowBuilder<ButtonBuilder>().addComponents(answerButton));
    }

    await interaction.reply({
      embeds: [replyEmbed],
      components: replyComponents,
    });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'Failed to ask local question',
      ephemeral: true,
    });
    return;
  }
}
