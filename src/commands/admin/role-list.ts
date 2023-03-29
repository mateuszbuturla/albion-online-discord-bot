import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  ContentRoleEntity,
  getAllRoles,
  getServerLanguage,
} from '../../entities';
import { ICommand, MessageType } from '../../types';

const getListOfRolessAsString = (roles: ContentRoleEntity[]): string => {
  return roles.map((x) => '`' + x.name + '`').join(' | ');
};

export const command: ICommand = {
  name: 'role-list',
  descriptionKey: 'command.role-list.help-description',
  aliases: [],
  adminOnly: true,
  run: async (client, message, args) => {
    const lang = await getServerLanguage(message.guildId as string);

    const result = await getAllRoles(message.guildId as string);

    if (!result || result.length === 0) {
      return error(message, {
        key: 'error.role-list-is-empty',
      });
    }

    const rolesListField = {
      name: {
        key: 'command.role-list.role-list',
        args: { count: result.length },
      },
      value: getListOfRolessAsString(result),
    };

    const embed = await generateEmbed({
      type: MessageType.INFORMATION,
      fields: [rolesListField],
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
