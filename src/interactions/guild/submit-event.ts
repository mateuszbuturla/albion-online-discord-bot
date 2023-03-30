import {
  EventEntity,
  finishEventCreation,
  getEventByUserIdWithStatusCreating,
  getServerContentChannel,
  getServerLanguage,
  setContentChannelAndMessageId,
} from '../../entities';
import { IInteraction } from '../../types';
import { Message, TextChannel } from 'discord.js';
import { contentEmbed, createContentModal } from '../../components';
import { contentReactionHandler } from '../../handlers';
import { getEmoji } from '../../utils';

const finishEventSetup = async (
  userId: string,
  eventName: string,
  eventDescription: string,
  date: string,
  time: string,
) => {
  const event = await getEventByUserIdWithStatusCreating(userId);

  if (!event) {
    console.log('missing event');
    return;
  }

  const result = await finishEventCreation(
    event,
    eventName,
    eventDescription,
    date,
    time,
  );

  return result;
};

const generateReactions = (message: Message, event: EventEntity): void => {
  [...event.template.roles, ...event.template.classes].forEach(async (item) => {
    const reactionEmoji = getEmoji(message, item.emoji);
    message.react(`${reactionEmoji}`);
  });
};

const sendDMMessage = async (
  interaction: any,
  message: string,
): Promise<void> => {
  await interaction.reply({
    content: message,
  });
};

const validateDateAndTime = (eventDate: string, eventTime: string) => {
  const dateRegex =
    /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
  const timeRegex = /^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?$/;

  const isValidDate = dateRegex.test(eventDate);
  const isValidTime = timeRegex.test(eventTime);

  return isValidDate && isValidTime;
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

    const validationResult = validateDateAndTime(eventDate, eventTime);

    if (!validationResult) {
      await sendDMMessage(
        interaction,
        'Nie prawidłowy format daty lub godziny',
      );

      return;
    }

    const event = await finishEventSetup(
      userId,
      eventName,
      eventDescription,
      eventDate,
      eventTime,
    );
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

    await setContentChannelAndMessageId(
      event,
      contentChannelId,
      messageResult.id,
    );

    await sendDMMessage(interaction, 'Wydarzenie zostało utworzone');
    await generateReactions(messageResult, event);
    await contentReactionHandler(messageResult, event.id, lang);
  },
};
