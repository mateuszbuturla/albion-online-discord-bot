import {
  EventEntity,
  finishEventCreation,
  getEventByUserIdWithStatusCreating,
  getServerContentChannel,
  getServerLanguage,
} from '../../entities';
import { IInteraction } from '../../types';
import { Message, TextChannel } from 'discord.js';
import { contentEmbed } from '../../components';
import { contentReactionHandler } from '../../handlers';
import { getEmoji } from '../../utils';

const finishEventSetup = async (
  userId: string,
  eventName: string,
  eventDescription: string,
) => {
  const event = await getEventByUserIdWithStatusCreating(userId);

  if (!event) {
    console.log('missing event');
    return;
  }

  const result = await finishEventCreation(event, eventName, eventDescription);

  return result;
};

const generateReactions = (message: Message, event: EventEntity): void => {
  [...event.template.roles, ...event.template.classes].forEach(async (item) => {
    const reactionEmoji = getEmoji(message, item.emoji);
    message.react(`${reactionEmoji}`);
  });
};

const sendDMMessage = async (interaction: any): Promise<void> => {
  await interaction.reply({
    content: 'Wydarzenie zostało utworzone',
  });
};

export const interaction: IInteraction = {
  name: 'submit-event',
  run: async (client, interaction) => {
    const userId: string = interaction.user.id;
    const eventName = interaction.fields.getTextInputValue('eventName');
    const eventDescription =
      interaction.fields.getTextInputValue('eventDescription');
    const eventDate = interaction.fields.getTextInputValue('eventDate');
    const eventTime = interaction.fields.getTextInputValue('eventTime');

    const event = await finishEventSetup(userId, eventName, eventDescription);
    if (!event) {
      return;
    }

    const lang = await getServerLanguage(event.guildId);
    const contentChannelId = await getServerContentChannel(event.guildId);

    if (!contentChannelId) {
      return;
    }

    const guild = await client.guilds.fetch(event.guildId);
    const channel = (await guild.channels.fetch(
      contentChannelId,
    )) as TextChannel;
    if (!channel) {
      return;
    }

    const embed = await contentEmbed(event, lang);
    const messageResult = await channel.send({ embeds: [embed] });

    await sendDMMessage(interaction);
    await generateReactions(messageResult, event);
    await contentReactionHandler(messageResult, event, lang);
  },
};
