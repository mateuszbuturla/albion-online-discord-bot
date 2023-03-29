import { ContentRoleEntity } from './contentRole.entity';

export const getContentRoleByName = async (
  guildId: string,
  name: string,
): Promise<ContentRoleEntity | null> => {
  const findTemplate = await ContentRoleEntity.findOne({
    where: { guildId, name },
  });

  return findTemplate;
};

export const createContentRole = async (guildId: string, name: string) => {
  const newTemplate = new ContentRoleEntity();
  newTemplate.guildId = guildId;
  newTemplate.name = name;
  return await newTemplate.save();
};
