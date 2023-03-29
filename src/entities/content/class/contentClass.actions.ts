import { ContentClassEntity } from './contentClass.entity';

export const getContentClassByName = async (
  guildId: string,
  name: string,
): Promise<ContentClassEntity | null> => {
  const findTemplate = await ContentClassEntity.findOne({
    where: { guildId, name },
  });

  return findTemplate;
};

export const createContentClass = async (guildId: string, name: string) => {
  const newTemplate = new ContentClassEntity();
  newTemplate.guildId = guildId;
  newTemplate.name = name;
  return await newTemplate.save();
};
