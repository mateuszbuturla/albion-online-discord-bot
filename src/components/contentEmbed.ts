import { Language, MessageType } from '../types';
import { ContentParticipantEntity, EventEntity } from '../entities';
import { generateEmbed } from '../utils';
import { APIEmbedField, EmbedBuilder, GuildEmoji } from 'discord.js';

const getEmojiForValue = async (
  guildId: string,
  emojiName: string,
): Promise<GuildEmoji | undefined> => {
  const result = (
    await globalThis.client.guilds.fetch(guildId)
  ).emojis.cache.find((emoji) => emoji.name === emojiName);

  return result;
};

const getValue = async (party: ContentParticipantEntity[]) => {
  if (party.length === 0) {
    return '-';
  }

  let result: string[] = [];

  for (let i = 0; i < party.length; i++) {
    const item = party[i];

    const emoji = await getEmojiForValue(
      item.guildId,
      item.selectedClass.emoji,
    );

    result = [...result, `${emoji} ${item.userName}`];
  }

  return result.join('\n');
};

const getParticipantsList = async (
  event: EventEntity,
): Promise<APIEmbedField[]> => {
  let result: APIEmbedField[] = [];

  for (let i = 0; i < event.template.classes.length; i++) {
    const tClass = event.template.classes[i];

    const participantWithClass: ContentParticipantEntity[] =
      event.participants.filter((p) => p.selectedClass.id === tClass.id);

    const classEmoji = await getEmojiForValue(event.guildId, tClass.emoji);

    result = [
      ...result,
      {
        name: `${classEmoji} ${tClass.name} (${participantWithClass.length})`,
        value: await getValue(participantWithClass),
        inline: (i + 1) % 4 !== 0,
      },
    ];
  }

  return result;
};

export const contentEmbed = async (
  event: EventEntity,
  lang: Language,
): Promise<EmbedBuilder> => {
  const embed = await generateEmbed({
    type: MessageType.INFORMATION,
    customTitle: event.name,
    description: {
      key: 'content.description',
      args: {
        customDescription: event.description,
        id: event.id,
        nick: event.author,
      },
    },
    lang,
  });

  const participants = await getParticipantsList(event);

  embed.addFields(
    { name: '📅 Data', value: event.date, inline: true },
    { name: '🕑 Godzina', value: event.time, inline: true },
    { name: '👥 Grupa', value: `${event.participants.length}`, inline: true },
    ...participants,
  );

  return embed;
};
