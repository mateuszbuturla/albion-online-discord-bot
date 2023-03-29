import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  getContentTemplateByName,
  addClassToTemplate as addClassToTemplateAction,
  removeClassFromTemplate as removeClassfromTemplateAction,
  getServerLanguage,
  getContentClassByName,
} from '../../entities';
import { ContentManageActions, ICommand, MessageType } from '../../types';
import { checkIfEnumIncludesValue } from '../../helpers';
import { Message } from 'discord.js';

const args = [
  {
    name: 'command.template-class.args.template-name',
    required: true,
  },
  {
    name: 'command.template-class.args.action',
    required: true,
  },
  {
    name: 'command.template-class.args.class-name',
    required: true,
  },
];

const checkIfClassIsExist = async (
  guildId: string,
  name: string,
): Promise<boolean> => {
  const templateClass = await getContentClassByName(guildId, name);

  return !!templateClass;
};

const checkIfTemplateNameIsExist = async (
  guildId: string,
  name: string,
): Promise<boolean> => {
  const template = await getContentTemplateByName(guildId, name);

  return !!template;
};

const addClassToTemplate = async (
  message: Message,
  guildId: string,
  templateName: string,
  className: string,
) => {
  const lang = await getServerLanguage(guildId);
  const template = await getContentTemplateByName(guildId, templateName);
  const contentClass = await getContentClassByName(guildId, className);

  if (!template || !contentClass) {
    return error(message, {
      key: 'error.server-error',
    });
  }

  const result = await addClassToTemplateAction(template, contentClass);

  if (!result) {
    return error(message, {
      key: 'error.server-error',
    });
  }

  const embed = await generateEmbed({
    type: MessageType.SUCCESS,
    description: {
      key: 'command.template-class.add.success',
      args: { templateName, className },
    },
    lang,
  });

  message.channel.send({ embeds: [embed] });
};

const removeClassfromTemplate = async (
  message: Message,
  guildId: string,
  templateName: string,
  className: string,
) => {
  const lang = await getServerLanguage(guildId);
  const template = await getContentTemplateByName(guildId, templateName);
  const contentClass = await getContentClassByName(guildId, className);

  if (!template || !contentClass) {
    return error(message, {
      key: 'error.server-error',
    });
  }

  const result = await removeClassfromTemplateAction(template, contentClass);

  if (!result) {
    return error(message, {
      key: 'error.server-error',
    });
  }

  const embed = await generateEmbed({
    type: MessageType.SUCCESS,
    description: {
      key: 'command.template-class.remove.success',
      args: { templateName, className },
    },
    lang,
  });

  message.channel.send({ embeds: [embed] });
};

export const command: ICommand = {
  name: 'template-class',
  descriptionKey: 'command.template-class.help-description',
  aliases: [],
  args,
  adminOnly: true,
  run: async (client, message, args) => {
    const templateName = args[0];
    const action = args[1];
    const className = args[2];

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

    if (!(await checkIfClassIsExist(message.guildId as string, className))) {
      return error(message, {
        key: 'error.class-is-not-exist',
      });
    }

    const parseAction = ContentManageActions[action as ContentManageActions];

    if (parseAction === ContentManageActions.add) {
      await addClassToTemplate(
        message,
        message.guildId as string,
        templateName,
        className,
      );
    } else if (parseAction === ContentManageActions.remove) {
      await removeClassfromTemplate(
        message,
        message.guildId as string,
        templateName,
        className,
      );
    }
  },
};
