import { contentEmbed } from '../components';
import { Message } from 'discord.js';
import {
  addParticipantToEvent,
  createContentParticipant,
  EventEntity,
  getContentClassByEmoji,
  getEventById,
  getParticipantFromEvent,
  removeParticipantFromEvent,
  updateParticipantClass,
} from '../entities';
import { Language } from '../types';

const updateEmbed = async (
  message: Message,
  event: EventEntity,
  lang: Language,
): Promise<void> => {
  const newEmbed = await contentEmbed(event, lang);

  message.edit({ embeds: [newEmbed] });
};

const getEventAndUpdateEmbed = async (
  message: Message,
  id: string,
  lang: Language,
): Promise<void> => {
  const result = await getEventById(id);

  if (!result) {
    return;
  }

  await updateEmbed(message, result, lang);
};

export const contentReactionHandler = async (
  message: Message,
  eventId: string,
  lang: Language,
) => {
  const filter = () => true;

  const collector = message.createReactionCollector({
    filter,
  });

  collector.on('collect', async (reaction, user) => {
    if (user.bot) {
      return;
    }

    const event = await getEventById(eventId);

    if (!event) {
      return;
    }

    message.reactions.resolve(reaction).users.remove(user);

    const userId = user.id;
    const userName = user.username;
    const guildId = reaction.message.guildId as string;
    const selectedClass = reaction.emoji.name as string;

    const findClass = await getContentClassByEmoji(guildId, selectedClass);

    if (findClass) {
      const findParticipant = await getParticipantFromEvent(event, userId);

      if (!findParticipant) {
        const participant = await createContentParticipant(
          guildId,
          userId,
          userName,
          findClass,
        );

        const result = await addParticipantToEvent(event, participant);

        if (!result) {
          return;
        }

        await updateEmbed(message, event, lang);

        return;
      }

      if (findParticipant.selectedClass.id === findClass.id) {
        await removeParticipantFromEvent(findParticipant);
        await getEventAndUpdateEmbed(message, event.id, lang);

        return;
      }

      await updateParticipantClass(findParticipant, findClass);
      await getEventAndUpdateEmbed(message, event.id, lang);
    }
  });
};
