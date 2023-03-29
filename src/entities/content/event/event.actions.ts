import { EventStaus } from '../../../types';
import { ContentTemplateEntity } from '../contentTemplate.entity';
import { EventEntity } from './event.entity';

export const createEvent = async (
  guildId: string,
  authorId: string,
): Promise<EventEntity> => {
  const newEvent = new EventEntity();
  newEvent.guildId = guildId;
  newEvent.authorId = authorId;
  newEvent.status = EventStaus.creating;
  return await newEvent.save();
};

export const getEventByUserIdWithStatusCreating = async (
  authorId: string,
): Promise<EventEntity | null> => {
  const result = await EventEntity.findOne({
    where: { authorId, status: EventStaus.creating },
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
) => {
  event.name = name;
  event.description = description;
  event.status = EventStaus.pending;
  await event.save();

  return event;
};
