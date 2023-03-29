import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  createTemplate,
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

const checkIfTemplateNameIsExist = async (
  guildId: string,
  name: string,
): Promise<boolean> => {
  const template = await getContentTemplateByName(guildId, name);

  return !!template;
};

export const command: ICommand = {
  name: 'template-create',
  descriptionKey: 'command.template-create.help-description',
  aliases: [],
  args,
  adminOnly: true,
  run: async (client, message, args) => {
    const lang = await getServerLanguage(message.guildId as string);

    if (await checkIfTemplateNameIsExist(message.guildId as string, args[0])) {
      return error(message, {
        key: 'error.template-with-provided-name-is-exist',
      });
    }

    const name = args[0];

    const result = await createTemplate(message.guildId as string, name);

    if (!result) {
      return error(message, {
        key: 'error.server-error',
      });
    }

    const embed = await generateEmbed({
      type: MessageType.SUCCESS,
      description: { key: 'command.template-create.success', args: { name } },
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
