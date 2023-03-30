import { Language, MessageType } from '../types';
import { ContentParticipantEntity, EventEntity } from '../entities';
import { generateEmbed } from '../utils';
import { EmbedBuilder } from 'discord.js';

const getValue = (party: ContentParticipantEntity[]) => {
  if (party.length === 0) {
    return '-';
  }

  return party.map((item) => item.userName).join('\n');
};

const getParticipantsList = (event: EventEntity) => {
  return event.template.classes.map((tClass, index) => {
    const participantWithClass: ContentParticipantEntity[] =
      event.participants.filter((p) => p.selectedClass.id === tClass.id);

    return {
      name: `${tClass.name} (${participantWithClass.length})`,
      value: getValue(participantWithClass),
      inline: (index + 1) % 4 !== 0,
    };
  });
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

  embed.addFields(
    { name: '📅 Data', value: '21.12.2023', inline: true },
    { name: '🕑 Godzina', value: '11:11', inline: true },
    { name: '👥 Grupa', value: `${event.participants.length}`, inline: true },
    ...getParticipantsList(event),
  );

  return embed;
};
