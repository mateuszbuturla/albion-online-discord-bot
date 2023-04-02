import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  getContentRoleByName,
  deleteRole,
  getServerLanguage,
} from '../../entities';
import { ICommand, MessageType } from '../../types';

const args = [
  {
    name: 'command.role-delete.args.name',
    required: true,
  },
];

export const command: ICommand = {
  name: 'role-delete',
  descriptionKey: 'command.role-delete.help-description',
  aliases: [],
  args,
  adminOnly: true,
  disabled: true,
  run: async (client, message, args) => {
    const lang = await getServerLanguage(message.guildId as string);

    const roleName = args[0];

    const role = await getContentRoleByName(
      message.guildId as string,
      roleName,
    );

    if (role === null) {
      return error(message, {
        key: 'error.role-is-not-exist',
      });
    }

    const result = await deleteRole(role);

    if (!result) {
      return error(message, {
        key: 'error.server-error',
      });
    }

    const embed = await generateEmbed({
      type: MessageType.SUCCESS,
      description: {
        key: 'command.role-delete.success',
        args: { roleName },
      },
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
