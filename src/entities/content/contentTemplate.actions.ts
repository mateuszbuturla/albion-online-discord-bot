import { ContentClassEntity } from './class';
import { ContentTemplateEntity } from './contentTemplate.entity';
import { ContentRoleEntity } from './role';

export const getContentTemplateByName = async (
  guildId: string,
  name: string,
): Promise<ContentTemplateEntity | null> => {
  const findTemplate = await ContentTemplateEntity.findOne({
    where: { guildId, name },
    relations: ['roles', 'classes'],
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

export const addClassToTemplate = async (
  template: ContentTemplateEntity,
  contentClass: ContentClassEntity,
): Promise<ContentTemplateEntity> => {
  if (!template.classes.find((item) => item.id === contentClass.id)) {
    template.classes = [...template.classes, contentClass];
    await template.save();
  }

  return template;
};

export const removeClassFromTemplate = async (
  template: ContentTemplateEntity,
  contentClass: ContentClassEntity,
): Promise<ContentTemplateEntity> => {
  template.classes = template.classes.filter(
    (item) => item.id !== contentClass.id,
  );
  await template.save();

  return template;
};

export const deleteTemplate = async (
  template: ContentTemplateEntity,
): Promise<ContentTemplateEntity> => {
  await template.remove();

  return template;
};

export const getContentTemplateById = async (
  guildId: string,
  id: string,
): Promise<ContentTemplateEntity | null> => {
  const findTemplate = await ContentTemplateEntity.findOne({
    where: { guildId, id },
    relations: ['roles', 'classes'],
  });

  return findTemplate;
};
