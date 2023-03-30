import { ContentClassEntity } from '../class';
import { EventEntity } from '../event';
import { ContentParticipantEntity } from './contentParticipant.entity';

export const createContentParticipant = async (
  guildId: string,
  userId: string,
  userName: string,
  selectedClass: ContentClassEntity,
) => {
  const newParticipant = new ContentParticipantEntity();
  newParticipant.guildId = guildId;
  newParticipant.userId = userId;
  newParticipant.selectedClass = selectedClass;
  newParticipant.userName = userName;
  return await newParticipant.save();
};

export const getParticipantFromEvent = async (
  event: EventEntity,
  userId: string,
) => {
  const result = await ContentParticipantEntity.findOne({
    where: { userId, event: { id: event.id } },
    relations: ['selectedClass'],
  });

  return result;
};

export const updateParticipantClass = async (
  participant: ContentParticipantEntity,
  selectedClass: ContentClassEntity,
) => {
  participant.selectedClass = selectedClass;
  return await participant.save();
};

export const removeParticipantFromEvent = async (
  participant: ContentParticipantEntity,
) => {
  return await participant.remove();
};
