import { EventStaus } from '../../../types';
import { ContentTemplateEntity } from '../contentTemplate.entity';
import { ContentParticipantEntity } from '../participant';
import { EventEntity } from './event.entity';

export const createEvent = async (
  guildId: string,
  authorId: string,
  authorName: string,
): Promise<EventEntity> => {
  const newEvent = new EventEntity();
  newEvent.guildId = guildId;
  newEvent.authorId = authorId;
  newEvent.author = authorName;
  newEvent.status = EventStaus.creating;
  return await newEvent.save();
};

export const getEventByUserIdWithStatusCreating = async (
  authorId: string,
): Promise<EventEntity | null> => {
  const result = await EventEntity.findOne({
    where: { authorId, status: EventStaus.creating },
    relations: ['template', 'template.classes', 'template.roles'],
  });

  return result;
};

export const saveTemplateToEvent = async (
  event: EventEntity,
  template: ContentTemplateEntity,
) => {
  event.template = template;
  await event.save();

  return event;
};

export const finishEventCreation = async (
  event: EventEntity,
  name: string,
  description: string,
): Promise<EventEntity> => {
  event.name = name;
  event.description = description;
  event.status = EventStaus.pending;
  event.participants = [];
  await event.save();

  return event;
};

export const addParticipantToEvent = async (
  event: EventEntity,
  participant: ContentParticipantEntity,
): Promise<EventEntity> => {
  event.participants = [...event.participants, participant];
  await event.save();

  return event;
};

export const getEventById = async (id: string): Promise<EventEntity | null> => {
  const result = await EventEntity.findOne({
    where: { id },
    relations: [
      'template',
      'template.classes',
      'template.roles',
      'participants',
      'participants.selectedClass',
    ],
  });

  return result;
};
