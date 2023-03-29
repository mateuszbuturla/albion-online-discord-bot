import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  ContentTemplateEntity,
  getAllTemplates,
  getServerLanguage,
} from '../../entities';
import { ICommand, MessageType } from '../../types';
import { getPrefix } from '../../helpers';

const getListOfTemplatesAsString = (
  templates: ContentTemplateEntity[],
): string => {
  return templates.map((x) => '`' + x.name + '`').join(' | ');
};

export const command: ICommand = {
  name: 'template-list',
  descriptionKey: 'command.template-list.help-description',
  aliases: [],
  adminOnly: true,
  run: async (client, message, args) => {
    const prefix = getPrefix();
    const lang = await getServerLanguage(message.guildId as string);

    const result = await getAllTemplates(message.guildId as string);

    if (!result || result.length === 0) {
      return error(message, {
        key: 'error.templates-list-is-empty',
      });
    }

    const templatesListField = {
      name: {
        key: 'command.template-list.template-list',
        args: { count: result.length },
      },
      value: getListOfTemplatesAsString(result),
    };

    const embed = await generateEmbed({
      type: MessageType.INFORMATION,
      fields: [templatesListField],
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
