import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  createContentClass,
  getContentClassByName,
  getServerLanguage,
} from '../../entities';
import { ICommand, MessageType } from '../../types';

const args = [
  {
    name: 'command.class-create.args.name',
    required: true,
  },
  {
    name: 'command.class-create.args.emoji',
    required: true,
  },
];

const checkIfRoleIsExist = async (
  guildId: string,
  name: string,
): Promise<boolean> => {
  const templateClass = await getContentClassByName(guildId, name);

  return !!templateClass;
};

export const command: ICommand = {
  name: 'class-create',
  descriptionKey: 'command.class-create.help-description',
  aliases: [],
  args,
  adminOnly: true,
  run: async (client, message, args) => {
    const lang = await getServerLanguage(message.guildId as string);

    if (await checkIfRoleIsExist(message.guildId as string, args[0])) {
      return error(message, {
        key: 'error.class-with-provided-name-is-exist',
      });
    }

    const name = args[0];
    const emoji = args[1];

    const result = await createContentClass(
      message.guildId as string,
      name,
      emoji,
    );

    if (!result) {
      return error(message, {
        key: 'error.server-error',
      });
    }

    const embed = await generateEmbed({
      type: MessageType.SUCCESS,
      description: { key: 'command.class-create.success', args: { name } },
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
