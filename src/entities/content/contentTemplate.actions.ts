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

export const createTemplate = async (
  guildId: string,
  name: string,
): Promise<ContentTemplateEntity> => {
  const newTemplate = new ContentTemplateEntity();
  newTemplate.guildId = guildId;
  newTemplate.name = name;
  return await newTemplate.save();
};

export const getAllTemplates = async (
  guildId: string,
): Promise<ContentTemplateEntity[]> => {
  const result = await ContentTemplateEntity.find({ where: { guildId } });

  return result;
};
