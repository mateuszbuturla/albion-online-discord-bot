import { ContentTemplateEntity } from './contentTemplate.entity';
import { ContentRoleEntity } from './role';

export const getContentTemplateByName = async (
  guildId: string,
  name: string,
): Promise<ContentTemplateEntity | null> => {
  const findTemplate = await ContentTemplateEntity.findOne({
    where: { guildId, name },
    relations: ['roles'],
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

export const addRoleToTemplate = async (
  template: ContentTemplateEntity,
  role: ContentRoleEntity,
): Promise<ContentTemplateEntity> => {
  if (!template.roles.find((item) => item.id === role.id)) {
    template.roles = [...template.roles, role];
    await template.save();
  }

  return template;
};

export const removeRoleFromTemplate = async (
  template: ContentTemplateEntity,
  role: ContentRoleEntity,
): Promise<ContentTemplateEntity> => {
  template.roles = template.roles.filter((item) => item.id !== role.id);
  await template.save();

  return template;
};
