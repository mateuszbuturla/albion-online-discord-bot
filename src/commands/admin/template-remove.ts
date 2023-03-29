import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  deleteTemplate,
  getContentTemplateByName,
  getServerLanguage,
} from '../../entities';
import { ICommand, MessageType } from '../../types';

const args = [
  {
    name: 'command.template-create.args.name',
    required: true,
  },
];

export const command: ICommand = {
  name: 'template-delete',
  descriptionKey: 'command.template-delete.help-description',
  aliases: [],
  args,
  adminOnly: true,
  run: async (client, message, args) => {
    const lang = await getServerLanguage(message.guildId as string);

    const templateName = args[0];

    const template = await getContentTemplateByName(
      message.guildId as string,
      templateName,
    );

    if (template === null) {
      return error(message, {
        key: 'error.template-with-provided-name-is-exist',
      });
    }

    const result = await deleteTemplate(template);

    if (!result) {
      return error(message, {
        key: 'error.server-error',
      });
    }

    const embed = await generateEmbed({
      type: MessageType.SUCCESS,
      description: {
        key: 'command.template-delete.success',
        args: { templateName },
      },
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
