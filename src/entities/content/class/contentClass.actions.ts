import { ContentClassEntity } from './contentClass.entity';

export const getContentClassByName = async (
  guildId: string,
  name: string,
): Promise<ContentClassEntity | null> => {
  const findClass = await ContentClassEntity.findOne({
    where: { guildId, name },
  });

  return findClass;
};

export const getContentClassByEmoji = async (
  guildId: string,
  emoji: string,
): Promise<ContentClassEntity | null> => {
  const findClass = await ContentClassEntity.findOne({
    where: { guildId, emoji },
  });

  return findClass;
};

export const createContentClass = async (
  guildId: string,
  name: string,
  emoji: string,
) => {
  const newTemplate = new ContentClassEntity();
  newTemplate.guildId = guildId;
  newTemplate.name = name;
  newTemplate.emoji = emoji;
  return await newTemplate.save();
};

export const getAllClasses = async (
  guildId: string,
): Promise<ContentClassEntity[]> => {
  const result = await ContentClassEntity.find({ where: { guildId } });

  return result;
};

export const deleteClass = async (
  contentClass: ContentClassEntity,
): Promise<ContentClassEntity> => {
  await contentClass.remove();

  return contentClass;
};
