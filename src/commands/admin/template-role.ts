import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  getContentRoleByName,
  getContentTemplateByName,
  addRoleToTemplate as addRoleToTemplateAction,
  removeRoleFromTemplate as removeRolefromTemplateAction,
  getServerLanguage,
} from '../../entities';
import { ContentManageActions, ICommand, MessageType } from '../../types';
import { checkIfEnumIncludesValue } from '../../helpers';
import { Message } from 'discord.js';

const args = [
  {
    name: 'command.template-role.args.template-name',
    required: true,
  },
  {
    name: 'command.template-role.args.action',
    required: true,
  },
  {
    name: 'command.template-role.args.role-name',
    required: true,
  },
];

const checkIfRoleIsExist = async (
  guildId: string,
  name: string,
): Promise<boolean> => {
  const templateClass = await getContentRoleByName(guildId, name);

  return !!templateClass;
};

const checkIfTemplateNameIsExist = async (
  guildId: string,
  name: string,
): Promise<boolean> => {
  const template = await getContentTemplateByName(guildId, name);

  return !!template;
};

const addRoleToTemplate = async (
  message: Message,
  guildId: string,
  templateName: string,
  roleName: string,
) => {
  const lang = await getServerLanguage(guildId);
  const template = await getContentTemplateByName(guildId, templateName);
  const role = await getContentRoleByName(guildId, roleName);

  if (!template || !role) {
    return error(message, {
      key: 'error.server-error',
    });
  }

  const result = await addRoleToTemplateAction(template, role);

  if (!result) {
    return error(message, {
      key: 'error.server-error',
    });
  }

  const embed = await generateEmbed({
    type: MessageType.SUCCESS,
    description: {
      key: 'command.template-role.add.success',
      args: { templateName, roleName },
    },
    lang,
  });

  message.channel.send({ embeds: [embed] });
};

const removeRolefromTemplate = async (
  message: Message,
  guildId: string,
  templateName: string,
  roleName: string,
) => {
  const lang = await getServerLanguage(guildId);
  const template = await getContentTemplateByName(guildId, templateName);
  const role = await getContentRoleByName(guildId, roleName);

  if (!template || !role) {
    return error(message, {
      key: 'error.server-error',
    });
  }

  const result = await removeRolefromTemplateAction(template, role);

  if (!result) {
    return error(message, {
      key: 'error.server-error',
    });
  }

  const embed = await generateEmbed({
    type: MessageType.SUCCESS,
    description: {
      key: 'command.template-role.remove.success',
      args: { templateName, roleName },
    },
    lang,
  });

  message.channel.send({ embeds: [embed] });
};

export const command: ICommand = {
  name: 'template-role',
  descriptionKey: 'command.template-role.help-description',
  aliases: [],
  args,
  adminOnly: true,
  disabled: true,
  run: async (client, message, args) => {
    const templateName = args[0];
    const action = args[1];
    const roleName = args[2];

    if (
      !(await checkIfTemplateNameIsExist(
        message.guildId as string,
        templateName,
      ))
    ) {
      return error(message, {
        key: 'error.template-is-not-exist',
      });
    }

    if (!checkIfEnumIncludesValue(ContentManageActions, action)) {
      return error(message, { key: 'error.incorrect-action' });
    }

    if (!(await checkIfRoleIsExist(message.guildId as string, roleName))) {
      return error(message, {
        key: 'error.role-is-not-exist',
      });
    }

    const parseAction = ContentManageActions[action as ContentManageActions];

    if (parseAction === ContentManageActions.add) {
      await addRoleToTemplate(
        message,
        message.guildId as string,
        templateName,
        roleName,
      );
    } else if (parseAction === ContentManageActions.remove) {
      await removeRolefromTemplate(
        message,
        message.guildId as string,
        templateName,
        roleName,
      );
    }
  },
};
