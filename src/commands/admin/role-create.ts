import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  createContentRole,
  getContentRoleByName,
  getServerLanguage,
} from '../../entities';
import { ICommand, MessageType } from '../../types';

const args = [
  {
    name: 'command.role-create.args.name',
    required: true,
  },
  {
    name: 'command.role-create.args.emoji',
    required: true,
  },
];

const checkIfRoleIsExist = async (
  guildId: string,
  name: string,
): Promise<boolean> => {
  const role = await getContentRoleByName(guildId, name);

  return !!role;
};

export const command: ICommand = {
  name: 'role-create',
  descriptionKey: 'command.role-create.help-description',
  aliases: [],
  args,
  adminOnly: true,
  disabled: true,
  run: async (client, message, args) => {
    const lang = await getServerLanguage(message.guildId as string);

    if (await checkIfRoleIsExist(message.guildId as string, args[0])) {
      return error(message, {
        key: 'error.role-with-provided-name-is-exist',
      });
    }

    const name = args[0];
    const emoji = args[1];

    const result = await createContentRole(
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
      description: { key: 'command.role-create.success', args: { name } },
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
