import { ContentTemplateEntity } from './contentTemplate.entity';

export const getContentTemplateByName = async (
  guildId: string,
  name: string,
): Promise<ContentTemplateEntity | null> => {
  const findTemplate = await ContentTemplateEntity.findOne({
    where: { guildId, name },
  });

  return findTemplate;
};

export const createTemplate = async (guildId: string, name: string) => {
  const newTemplate = new ContentTemplateEntity();
  newTemplate.guildId = guildId;
  newTemplate.name = name;
  return await newTemplate.save();
};
